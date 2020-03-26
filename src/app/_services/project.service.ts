import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';


import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NameAndID } from '../_models/name-and-id';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<Project[]>  {
      return this.http.get<Project[]>(`${environment.apiUrl}/api/projects`);
  }
    
  getNameAndID() : Observable<NameAndID[]>  {
    return this.http.get<NameAndID[]>(`${environment.apiUrl}/api/projects/getProjectNameAndIds`);
  }
  

  getById(id: number) {
      return this.http.get(`${environment.apiUrl}/api/projects/${id}`);
  }

  set(formData: FormData) {
    debugger;
      return this.http.post(`${environment.apiUrl}/api/projects/`, formData);
  }

  delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/api/projects/${id}`);
  }
}
