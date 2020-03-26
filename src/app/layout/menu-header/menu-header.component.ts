import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Aut } from 'src/app/_models/aut';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { NameAndID } from 'src/app/_models/name-and-id';
import { LocationHubService } from 'src/app/_services/location-hub.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {
  user: User;
  name: string;
  role: number;
  hideTask: boolean;
  hideUsers: boolean;
  hideProjects: boolean;
  private currentUserSubject: BehaviorSubject<Aut>;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private location:LocationHubService, 
    private toastr: ToastrService
  ) { 
    this.GetLogedUser();
  }

  
  ngOnInit() {  
    this.location.connect();
    this.location.
        locationCordinates.subscribe(loc => {
          this.toastr.info(loc.message,'Ticket updated');
        });
  }

  GetLogedUser(){

    const currentUser = this.authenticationService.currentUserValue;
    this.name = currentUser.userName;
    this.role = currentUser.role;

    switch(this.role){
      case 0:
          break;
      case 1:
          this.hideUsers = true;
          break;
      case 2:
      default:
          this.hideTask = true;
          this.hideUsers = true;
          this.hideProjects = true; 
          break;
    }
  }

  Logout() {
    this.authenticationService.logout();
    this.location.disconnect();
    this.router.navigate(['/login']);    
  }
}
