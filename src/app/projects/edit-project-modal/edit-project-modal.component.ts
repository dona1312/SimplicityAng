import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { Project } from 'src/app/_models/project';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {BsModalRef} from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/_services/project.service';
import { FormUtil } from 'src/app/_helpers/form.util';
import { CustomDate } from 'src/app/_helpers/custom-date';

import { AlertService } from 'src/app/_helpers/alert.service';
import { AlertServiceService } from 'src/app/_services/alert-service.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { NameAndID } from 'src/app/_models/name-and-id';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.sass']
})
export class EditProjectModalComponent implements OnInit {
	allUsers: NameAndID[];
	selectedUsers : number[];

	fromDate;
	toDate;
	name;
  @Output() onReloadEmitter = new EventEmitter<Project>();
	loading = false;
	project: Project;
	formGroup: FormGroup;
	
  constructor(
  	private fb: FormBuilder,
		private router: Router,
		private authenticationService: AuthenticationService,
		private usersService : UserService,
  	private projectService: ProjectService,
		private alertService: AlertServiceService,
  	public bsModalRef: BsModalRef) 
    { 
      if (!this.authenticationService.currentUserValue) 
      { 
        this.router.navigate(['/']);
      }
			this.buildForm(this.project);			
    }

  ngOnInit() {
		this.buildForm(this.project);
		this.loadUsers();
  }

  private buildForm(project?: Project) {
    if (!project) {
			project = new Project();
		}

		let projectID = 0;
		if(project.id) projectID = project.id;
		this.name = project.name;
		this.toDate = CustomDate.parseDate(project.toDate);
		this.fromDate = CustomDate.parseDate(project.fromDate);		
		
		if(project.assignedUsers){			
			this.selectedUsers =  project.assignedUsers.map(function(item){return item.id});
		}

		this.formGroup = this.fb.group({
			id: projectID,
			name: "",
			fromDate: ["", Validators.required],
			toDate: ["", Validators.required],
			users:[[]]
		});
		
  }

  onSubmit(): void {
		this.RequestSaveEditedProject();
	}
  
  RequestSaveEditedProject(){
    const data = FormUtil.prepareData(this.formGroup);		
		this.loading = true;
		
		const formData = new FormData();
		formData.append('ID', this.formGroup.controls.id.value); 
		formData.append('Name', this.formGroup.controls.name.value);
		formData.append('FromDate', CustomDate.parseDateFromJSON(this.fromDate));
		formData.append('ToDate', CustomDate.parseDateFromJSON(this.toDate));
		var assignedUsersSplit : string[]= [];
		assignedUsersSplit = this.selectedUsers.map(String);
	
		formData.append('AssignedUsersAsString', assignedUsersSplit.toString());
		
		this.projectService.set(formData)
			.pipe(first())
			.subscribe(
				(project : Project) => {
					this.onReloadEmitter.emit(project);
					this.bsModalRef.hide();				
				},
				error => {
					AlertService.showSuccessModal(error);
					this.loading = false;
				});
	}
	
	loadUsers(){
		this.usersService.getNameAndID().pipe(first()).subscribe(users => {	
			this.allUsers = users;
		});
	}

}
