import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertServiceService } from '../_services/alert-service.service';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

import { User } from '../_models/user';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  users: User[] = [];

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertServiceService
  ) {
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          id: '0',
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          Name: ['', Validators.required],
          Address: ['', Validators.required],
          Role: ''
      });
  }

  get f() { return this.registerForm.controls; }


  onSubmit() {
      this.submitted = true;
      
      if (this.registerForm.invalid) {
          return;
      }
      
      console.log(1111);
      this.loading = true;
      let role = "2";

      const formData = new FormData();
      formData.append('id', this.f.id.value);
      formData.append('username', this.f.username.value);
      formData.append('password', this.f.password.value);
      formData.append('Name', this.f.Name.value);
      formData.append('Address', this.f.Address.value);
      formData.append('Role', role);

      this.userService.register(formData)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
