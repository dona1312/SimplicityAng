import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {

  //loggedUser: User;
	isUser: boolean;
	isAdmin: boolean;

  constructor() { 
    //this.loggedUser = AppGlobals.getLoggedUser();
		this.isUser = true; //this.loggedUser.role === Constants.roles.User;
		this.isAdmin = true; //this.loggedUser.role === Constants.roles.Admin;
  }

  ngOnInit() {

  }

}
