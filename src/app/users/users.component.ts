import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertServiceService } from '../_services/alert-service.service';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

import { User } from '../_models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { Subscription } from 'rxjs';
import { AlertService } from '../_helpers/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  registerForm: FormGroup;
  users: User[] = [];
  bsModalRef: BsModalRef;
  onReloadSubscription: Subscription;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertServiceService,
    private bsModalService: BsModalService
  ) { 
      this.RequestUsers();
  }

  ngOnInit() {
  }


  onEditClick(user : User): void {
		if (!user) {
			user = new User();
		}

		this.bsModalRef = this.bsModalService.show(
      EditUserModalComponent,
			{
				initialState: {
					user: user
				}
			}
		);

		this.onReloadSubscription = this.bsModalRef.content.onReloadEmitter.subscribe(() => {
      this.RequestUsers();
			AlertService.showSuccessModal('User was successfully saved.');
			}
    );
  }

  onDeleteClick(userId : number) {
    this.RequestDeleteUsers(userId);
  }
  
  RequestUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  RequestDeleteUsers(userId : number) {
    this.userService.delete(userId).pipe(first()).subscribe(data => {this.RequestUsers();});
  }
}
