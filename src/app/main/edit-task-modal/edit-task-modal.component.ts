import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Task } from 'src/app/_models/task';
import { Status } from 'src/app/_models/task';
import { NameAndID } from 'src/app/_models/name-and-id';
import { Router } from '@angular/router';
import { first, delay } from 'rxjs/operators';
import {BsModalRef} from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/_services/task.service';
import { FormUtil } from 'src/app/_helpers/form.util';
import { CustomDate } from 'src/app/_helpers/custom-date';

import { AlertService } from 'src/app/_helpers/alert.service';
import { AlertServiceService } from 'src/app/_services/alert-service.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Select2OptionData } from 'ng-select2';
import { UserService } from 'src/app/_services/user.service';
import { ProjectService } from 'src/app/_services/project.service';


@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.sass']
})
export class EditTaskModalComponent implements OnInit {

  @Output() onReloadEmitter = new EventEmitter<Task>();
  loading = false;
	task: Task;
	statusEnum: Status;
	statusID: any;
	oldStatusID:any;
  formGroup: FormGroup;
  dueDate;
  hide;
  public users : NameAndID[];
  public projects : NameAndID[];
	name: string;

  constructor(
    private fb: FormBuilder,
	  private router: Router,
		private authenticationService: AuthenticationService,
		private userService: UserService,
		private projectService : ProjectService,
    private taskService: TaskService,
		private alertService: AlertServiceService,
    public bsModalRef: BsModalRef) 
  { 
      if (!this.authenticationService.currentUserValue) 
      { 
        this.router.navigate(['/']);
      }
      this.buildForm(this.task,this.name);
  }

  ngOnInit() {	
	this.buildForm(this.task,this.name);
	this.RequestNameAndID();
  }

  private buildForm(task?: Task,name?: string) {
	this.hide = true;
	if (!task) {			
		task = new Task();
	}	

	let assigneeID = 0;
	let creatorID = name;
	let projectID = 0;
	let taskID = 0;
	this.statusID = 0;
	this.oldStatusID=0;
	
	var names: string[] = [];
	for(var n in Status) {
			if(typeof Status[n] === 'number') names.push(n);
	}
	

	if(task.id) taskID = task.id;
	if(task.assignee) assigneeID = task.assignee.id;
	if(task.creator) creatorID = task.creator.name;
	if(task.project) projectID = task.project.id;
	if(task.status) this.statusID = task.status;
	if(task.oldStatus) this.oldStatusID = task.oldStatus;
	else this.hide = false;

	this.dueDate = CustomDate.parseDate(task.dueDate);

	this.formGroup = this.fb.group({
	id: taskID,
	name: task.name,
	description: [task.description, Validators.required],
	project: projectID,
	assignee: [assigneeID, Validators.required],
	creator: [creatorID, Validators.required],
	dueDate: ["", Validators.required],
	status: [names[this.statusID],Validators.required],
	oldStatus: [names[this.statusID],Validators.required]
	});
  }

  onSubmit(): void {
		this.RequestSaveEditedTask();
	}
  
  RequestSaveEditedTask(){
    const data = FormUtil.prepareData(this.formGroup);		
		this.loading = true;

		const formData = new FormData();
		formData.append('ID', this.formGroup.controls.id.value); 
		formData.append('Name', this.formGroup.controls.name.value);
		formData.append('Description', this.formGroup.controls.description.value);
    formData.append('AssigneeID', this.formGroup.controls.assignee.value);
		formData.append('CreatorID', this.authenticationService.currentUserValue.id.toString());
		formData.append('ProjectID', this.formGroup.controls.project.value);
		formData.append('DueDate', CustomDate.parseDateFromJSON(this.dueDate));
		formData.append('Status', this.statusID.toString());
		formData.append('OldStatus',this.oldStatusID.toString());
  
		this.taskService.set(formData)
		.pipe(first())
		.subscribe(
			(task : Task) => {
				this.onReloadEmitter.emit(task);
				this.bsModalRef.hide();
				//AlertService.showSuccessModal('User was successfully saved.');
				//this.alertService.success('Registration successful', true);					
			},
			error => {
				AlertService.showSuccessModal(error);
				//this.alertService.error(error);
				this.loading = false;
			});
  }

  RequestNameAndID(){
		this.userService.getNameAndID().pipe(first()).subscribe(users => {		
			this.users = users;
		});

		this.projectService.getNameAndID().pipe(first()).subscribe(proj => {		
			this.projects = proj;
		});		
  }
}
