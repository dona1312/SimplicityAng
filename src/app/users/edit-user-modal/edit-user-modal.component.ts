import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {BsModalRef} from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { FormUtil } from 'src/app/_helpers/form.util';

import { AlertService } from 'src/app/_helpers/alert.service';
import { AlertServiceService } from 'src/app/_services/alert-service.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NameAndID } from 'src/app/_models/name-and-id';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.sass']
})

export class EditUserModalComponent implements OnInit {

	@Output() onReloadEmitter = new EventEmitter<User>();
	loading = false;
	user: User;
	formGroup: FormGroup;
	userRole: NameAndID[];
	hide;
	
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authenticationService: AuthenticationService,
		private userService: UserService,
		private alertService: AlertServiceService,
		public bsModalRef: BsModalRef
	) {
		if (!this.authenticationService.currentUserValue) { 
			this.router.navigate(['/']);
		}
		this.buildForm(this.user);
	}

	
	private buildForm(user?: User) {
		this.hide = true;
		if (!user) {
			user = new User();
		}
		let userID = 0;
		let roleID = 0;
		if (user.role) roleID = user.role.id
		if (user.id) userID = user.id;
		else this.hide = false;
	
		this.formGroup = this.fb.group({
			id: userID,
			username: user.username,
			password: ['123456', [Validators.required, Validators.minLength(6)]],
			name: [user.name, Validators.required],
			address: [user.address, Validators.required],
			role: [roleID, Validators.required]
		});
	}

	ngOnInit(): void {
		this.buildForm(this.user);
		this.RequestNameAndID();
	}

	onSubmit(): void {
		this.RequestSaveEditedUser();
	}
	RequestNameAndID(){
		this.userRole = this.userService.getRoles();
	}

	RequestSaveEditedUser(){
		const data = FormUtil.prepareData(this.formGroup);		
		this.loading = true;
		
		const formData = new FormData();
		formData.append('ID', this.formGroup.controls.id.value); 
		formData.append('Username', this.formGroup.controls.username.value);
		formData.append('Password', this.formGroup.controls.password.value);
		formData.append('Name', this.formGroup.controls.name.value);
		formData.append('Address', this.formGroup.controls.address.value);
		formData.append('Role', this.formGroup.controls.role.value);
  
		this.userService.register(formData)
			.pipe(first())
			.subscribe(
				(userNew : User) => {
					this.onReloadEmitter.emit(userNew);
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
}
