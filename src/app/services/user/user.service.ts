import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserLogin } from 'src/app/interfaces/user-login';
import { UserSession } from 'src/app/interfaces/user-session';
import { UserSignup } from 'src/app/interfaces/user-signup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  @Output() authorized: EventEmitter<any> = new EventEmitter();
  
  public api: string = environment.api.path;
  private sessionKey = 'session';

  constructor(private http: HttpClient) { 

  }

  getUserSession = () => {
    const userSession = window.localStorage.getItem(this.sessionKey);
    return userSession ? JSON.parse(userSession) as UserSession : false;
  }

  saveUserSession = (userSession: UserSession) => {
    window.localStorage.setItem(this.sessionKey, JSON.stringify(userSession));
  }

  logout = () => {
    window.localStorage.removeItem(this.sessionKey);
  }

  login = (userLogin: UserLogin, callback) => {
    return this.http.post(`${this.api}/user/login`, {
      username: userLogin.username,
      password: userLogin.password
    })
    .subscribe((userSession: UserSession) => {
      userSession.username = userLogin.username;
      this.saveUserSession(userSession);
      callback(userSession)
    }, (error: HttpErrorResponse) => {
      callback(false)
    })
  }

  signup = (userSignup: UserSignup, callback) => {
    return this.http.post(`${this.api}/user/signup`, {
      username: userSignup.username,
      password: userSignup.password
    })
    .subscribe((userSession: UserSession) => {
      userSession.username = userSignup.username;
      this.saveUserSession(userSession);
      callback(userSession)
    }, (error: HttpErrorResponse) => {
      callback(error.error.message)
    })
  }


}
