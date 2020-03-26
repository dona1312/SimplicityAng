import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';

import { AuthGuard } from './_guards/auth.guard';
import { TasksBoardComponent } from './main/tasks-board/tasks-board.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';

const routes: Routes = [
    { path: '', component: TasksBoardComponent,canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterUserComponent },

    { path:'tickets', component:MainComponent,canActivate: [AuthGuard]},
    { path:'projects', component:ProjectsComponent,canActivate: [AuthGuard]},
    { path:'users', component:UsersComponent,canActivate: [AuthGuard]},
    { path:'change-password', component:ChangePasswordComponent,canActivate: [AuthGuard]},
    //{ path:'tasks-board', component:TasksBoardComponent,canActivate: [AuthGuard]},

    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
