import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/interfaces/user-login';
import { UserService } from 'src/app/services/user/user.service';
import { UserSession } from 'src/app/interfaces/user-session';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'tb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userLogin: UserLogin = {} as UserLogin;
  public userSession: UserSession = {} as UserSession;
  public valid = false;

  private setUserSession = (userSession: UserSession | boolean, showAlert: boolean) => {
    if (typeof userSession === 'boolean') {
      this.valid = userSession;
      if(showAlert) {
        this.alertsService.alert('warning', 'Incorrect Login');
      }
    } else {
      this.valid = true;
      this.userSession = userSession;
    }
  }

  private login = (userLogin: UserLogin) => {
    this.userService.login(userLogin, (userSession: UserSession | boolean) => {
        this.setUserSession(userSession, true);
    });
  }

  constructor(private userService: UserService, 
    private alertsService: AlertsService) {
    this.setUserSession(this.userService.getUserSession(), false);
  }

  logout() {
    this.userService.logout();
    this.valid = false;
    this.userLogin = {} as UserLogin;
    this.userSession = {} as UserSession;
  }

  onSubmit(userLogin: UserLogin) {
    this.login(userLogin);
  }

  ngOnInit() {
  }

}
