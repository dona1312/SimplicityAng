import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormUtil } from '../../_helpers/form.util';
import { UserService } from '../../_services/user.service';
import { AlertServiceService } from '../../_services/alert-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  formGroup: FormGroup;
  oldPassword;
  newPassword;
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertServiceService) {
      if (!this.authenticationService.currentUserValue) 
      { 
        this.router.navigate(['/']);
      }
     }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
		this.formGroup = this.fb.group({
			oldPassword: ["", Validators.required],
			newPassword: ["", Validators.required],
		});
	}


  onSubmit(): void {
    this.RequestSaveEditedProject();
    }
    
    RequestSaveEditedProject(){
      debugger;
      const data = FormUtil.prepareData(this.formGroup);		
      const formData = new FormData();
      formData.append('oldPassword', this.formGroup.controls.oldPassword.value); 
      formData.append('newPassword', this.formGroup.controls.newPassword.value);
    
      this.authenticationService.changePassword(formData)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/login']);
          },
          error => {
              this.alertService.error(error);
          });
    }
    
}
