import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { Aut } from './_models/aut';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  currentUser: Aut;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
      
      if(this.authenticationService.currentUser){
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      }   
           
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }    
}
