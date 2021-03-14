import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<String>;
  public currentUser: Observable<String>;


  constructor(private http: HttpClient, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<String>(sessionStorage.getItem('username') || '');
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Observable<String> {
      return this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) :Observable<any> {

      const headers = { 'content-type': 'application/json'}
      var body = { username:username, password: password}
      return this.http.post<any>(environment.authUrl, JSON.stringify(body),{'headers' :headers,responseType: 'text' as 'json'})
      .pipe(map(data => {
        let token = JSON.parse(data);
        if (token["jwtToken"]!=null) {
            // store user details in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('username',username);
            let tokenStr= 'Bearer '+token["jwtToken"];
             sessionStorage.setItem('token', tokenStr);
            this.currentUserSubject.next(username);
        }
        return token;
      }));
  }


  logout() {

      // remove user from local storage to log user out
      sessionStorage.removeItem('username')
      this.currentUserSubject.next('')
      this.router.navigate(['/']);


  }
}
