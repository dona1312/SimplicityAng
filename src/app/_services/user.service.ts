import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NameAndID } from '../_models/name-and-id';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<User[]>  {
      return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
  }

  getNameAndID() : Observable<NameAndID[]>  {
    return this.http.get<NameAndID[]>(`${environment.apiUrl}/api/users/getUserNameAndIds`);
  }
  
  getById(id: number) : Observable<User> {
      return this.http.get<User>(`${environment.apiUrl}/api/users/${id}`);
  }

  register(formData: FormData) {
      return this.http.post(`${environment.apiUrl}/api/users`, formData);
  }

  delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/api/users/${id}`);
  }

  getRoles() : NameAndID[]  {
    return  [
      {
        id: 0,
        name: "Administrator"
      },
      {
        id: 1,
        name: "Moderator"
      },
      {
        id: 2,
        name: "User"
      }      
    ];  
  } 
}

