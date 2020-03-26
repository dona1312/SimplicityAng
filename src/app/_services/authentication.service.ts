import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Aut } from '../_models/aut';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Aut>;
    public currentUser: Observable<Aut>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Aut>(JSON.parse(localStorage.getItem('currentUser')));
    }

    public get currentUserValue(): Aut {
        return this.currentUserSubject.value;
    }
    
    login(formData: FormData) : Observable<Aut> {
        return this.http.post<Aut>(`${environment.apiUrl}/api/account/login`, formData)
            .pipe(map(aut => {                
                if (aut) {
                    // store user
                    localStorage.setItem('currentUser', JSON.stringify(aut));
                    this.currentUserSubject.next(aut);
                }
                return aut;
            }));
    }
    changePassword(formData: FormData){
        debugger;
        return this.http.post(`${environment.apiUrl}/api/account/changePassword`, formData);
    }
    
    logout() {
        // remove user from local storage
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
