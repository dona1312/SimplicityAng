import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { Message } from '../_models/message';

export let CONFIGURATION = {
    baseUrls: {
      server: 'https://localhost:44393/',
      apiUrl: 'api/'
    }
  };

@Injectable({
  providedIn: 'root'
})

export class LocationHubService {
  private connection: signalR.HubConnection;
  connectionEstablished = new Subject<Boolean>();
  locationCordinates = new Subject<Message>();

  connect() {
    this.connectionEstablished = new Subject<Boolean>();
    this.locationCordinates = new Subject<Message>();
    
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
      .withUrl(CONFIGURATION.baseUrls.server +
          'location')
      .build();

       this.connectionEstablished = new Subject<Boolean>();
       this.locationCordinates = new Subject<Message>();

      this.connection.start().then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.next(true);
      }).catch(err => console.log(err));

      this.connection.on('GetMessage', (message, desc) => {
        console.log('Received', message, desc);
        this.locationCordinates.next({ message });       
      });
     }
  }

  disconnect(){
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }
  constructor() {

  }
}