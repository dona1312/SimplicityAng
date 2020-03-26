import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationHubService } from '../_services/location-hub.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements AfterViewInit {
  message:string;
  constructor(private location:LocationHubService, 
              private toastr: ToastrService) { }

  ngOnInit() {
  }
    successmsg(){  
      this.toastr.success("Toastr Success message",'Success')  
    }  
    errorsmsg(){  
        this.toastr.error("Toastr Error Notification",'Error')  
      
    }  
    infotoastr(message:string)  
    {  
    this.toastr.info(message, 'Information');  
    }  
    toastrwaring()  
    {  
      this.toastr.warning("Battery about to Die", 'Warning');  
    }  
  ngAfterViewInit() {
    this.location.connect();
    debugger;
    this.location.
        locationCordinates.subscribe(loc => {
          this.infotoastr(loc.message);
        });
  }
}
