import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Task } from '../_models/task';


import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<Task[]>  {
      return this.http.get<Task[]>(`${environment.apiUrl}/api/tasks`);
  }
  
  getById(id: number) {
      return this.http.get(`${environment.apiUrl}/api/tasks/${id}`);
  }

  getByUserId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/api/tasks/getByUserId/${id}`);
  }

  set(formData: FormData) {
      return this.http.post(`${environment.apiUrl}/api/tasks`, formData);
  }

  delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/api/tasks/${id}`);
  }
}