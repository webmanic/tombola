import { Component, OnInit, Input } from '@angular/core';
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

  private setUserSession = (userSession: UserSession | boolean, showAlert: boolean) => {
    if (typeof userSession === 'boolean') {
      if(showAlert) {
        this.alertsService.alert('warning', 'Incorrect Login');
      }
    } else {
      this.userService.authorized.emit(userSession);
    }
  }

  private login = (userLogin: UserLogin) => {
    this.userService.login(userLogin, (userSession: UserSession | boolean) => {
        this.setUserSession(userSession, true);
    });
  }

  constructor(private userService: UserService, 
    private alertsService: AlertsService) {
  }

  onSubmit(userLogin: UserLogin) {
    this.login(userLogin);
  }

  ngOnInit() {
  }

}
