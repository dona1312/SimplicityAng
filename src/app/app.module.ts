import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_guards/error.interceptor';
import { JwtInterceptor } from './_guards/jwt.interceptor';
import { NgDragDropModule } from 'ng-drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MainComponent } from './main/main.component';
import { ProjectsComponent } from './projects/projects.component';
import { AlertComponent } from './alert/alert.component';
import { UsersComponent } from './users/users.component';
import { MenuHeaderComponent } from './layout/menu-header/menu-header.component';
import { MenuSidebarComponent } from './layout/menu-sidebar/menu-sidebar.component';
import { PageLayoutComponent } from './layout/page-layout/page-layout.component';
import { MenuFooterComponent } from './layout/menu-footer/menu-footer.component';
import { EditUserModalComponent } from './users/edit-user-modal/edit-user-modal.component';
import { FieldErrorMessageComponent } from './_helpers/field-error-message/field-error-message.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EditProjectModalComponent } from './projects/edit-project-modal/edit-project-modal.component';
import { EditTaskModalComponent } from './main/edit-task-modal/edit-task-modal.component';
import { FormsModule} from '@angular/forms';
import { TasksBoardComponent } from './main/tasks-board/tasks-board.component';
import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationsComponent } from './notifications/notifications.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr';
import { ChangePasswordComponent } from './users/change-password/change-password.component';  

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    MainComponent,
    ProjectsComponent,
    AlertComponent,
    UsersComponent,
    MenuHeaderComponent,
    MenuSidebarComponent,
    PageLayoutComponent,
    MenuFooterComponent,
    EditUserModalComponent,
    FieldErrorMessageComponent,
    EditProjectModalComponent,
    EditTaskModalComponent,
    TasksBoardComponent,
    NotificationsComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    NgbModule,
    AngularFontAwesomeModule,
    FormsModule,
    NgDragDropModule.forRoot(),
    NgSelect2Module,
    NgSelectModule,
    BrowserAnimationsModule,  
    ToastrModule.forRoot() 
		// SweetAlert2Module.forRoot({
		// 	buttonsStyling: false,
		// 	customClass: 'modal-content',
		// 	confirmButtonClass: 'btn btn-primary',
		// 	cancelButtonClass: 'btn'
		// }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    BsModalRef
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditUserModalComponent,EditProjectModalComponent,EditTaskModalComponent]
})
export class AppModule { }
