import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertServiceService } from '../_services/alert-service.service';
import { ProjectService } from '../_services/project.service';
import { AuthenticationService } from '../_services/authentication.service';

import { User } from '../_models/user';
import { Project } from '../_models/project';
import { UserService } from '../_services/user.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditProjectModalComponent } from './edit-project-modal/edit-project-modal.component';
import { Subscription } from 'rxjs';
import { AlertService } from '../_helpers/alert.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  registerForm: FormGroup;
  projects: Project[] = [];
  bsModalRef: BsModalRef;
  onReloadSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private projectService: ProjectService,
    private alertService: AlertServiceService,
    private bsModalService: BsModalService
  ) {
    this.RequestProjects();
  }

  ngOnInit() {
  }

  onEditClick(project? : Project): void {
		if (!project) {
			project = new Project();
		}
    
		this.bsModalRef = this.bsModalService.show(
      EditProjectModalComponent,
			{
				initialState: {
					project: project
        }
			}
    );
    //this.bsModalRef.content.project = project;

		this.onReloadSubscription = this.bsModalRef.content.onReloadEmitter.subscribe(() => {
      this.RequestProjects();``
			AlertService.showSuccessModal('Project was successfully saved.');
			}
    );
  }

  onDeleteClick(projectId : number) {
    this.RequestDeleteProject(projectId);
  }

  RequestProjects() {
    this.projectService.getAll().pipe(first()).subscribe(projects => {
      this.projects = projects;
    });
  }

  RequestDeleteProject(projectId : number) {
    this.projectService.delete(projectId).pipe(first()).subscribe(data => {this.RequestProjects();});
  }
}
