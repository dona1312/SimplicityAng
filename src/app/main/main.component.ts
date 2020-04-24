import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertServiceService } from '../_services/alert-service.service';
import { AuthenticationService } from '../_services/authentication.service';
import { TaskService } from '../_services/task.service';
import { UserService } from '../_services/user.service';

import { Aut } from '../_models/aut';
import { User } from '../_models/user';
import { Task, Status } from '../_models/task';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { BehaviorSubject,Subscription } from 'rxjs';
import { AlertService } from '../_helpers/alert.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  registerForm: FormGroup;
  tasks: Task[] = [];
  bsModalRef: BsModalRef;
  onReloadSubscription: Subscription;
  name: string;
  private currentUserSubject: BehaviorSubject<Aut>;
  public Status = Status;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private taskService: TaskService,
    private alertService: AlertServiceService,
    private bsModalService: BsModalService,
    private userService: UserService
  ) { 
      this.RequestTask();
      this.GetLogedUserName();
  }

  ngOnInit() {
 	
  }

  onEditClick(task? : Task): void {
		if (!task) {
			task = new Task();
		}
    debugger;
		this.bsModalRef = this.bsModalService.show(
      EditTaskModalComponent,
			{
				initialState: {
          task: task,
          name: this.name
				}
			}
    );

		this.onReloadSubscription = this.bsModalRef.content.onReloadEmitter.subscribe(() => {
      this.RequestTask();
			AlertService.showSuccessModal('Task was successfully saved.');
			}
    );
  }

  onDeleteClick(taskId : number) {
    this.RequestDeleteTask(taskId);
  }

  RequestTask() { 
    this.taskService.getAll().pipe(first()).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  GetLogedUserName() {
    const currentUser = this.authenticationService.currentUserValue;
    this.name = currentUser.userName;
  }

  RequestDeleteTask(taskId : number) {
    this.taskService.delete(taskId).pipe(first()).subscribe(data => {this.RequestTask();});
  }

}
