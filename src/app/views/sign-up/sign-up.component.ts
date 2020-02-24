import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { UserSession } from 'src/app/interfaces/user-session';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { Router } from '@angular/router';
import { UserSignup } from 'src/app/interfaces/user-signup';

@Component({
  selector: 'tb-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public userSignup: UserSignup = {} as UserSignup;

  private setUserSession = (userSession: UserSession | string) => {
    if (typeof userSession === 'string') {
      this.alertsService.alert('warning', userSession);
    } else {
      this.userService.authorized.emit(userSession);
      this.router.navigate(['/events']);
    }
  }

  private signup = (userSignup: UserSignup) => {
    this.userService.signup(userSignup, (userSession: UserSession | string) => {
      this.setUserSession(userSession);
    });
  }

  constructor(private userService: UserService,
    private alertsService: AlertsService,
    private router: Router) { 
      this.userService.authorized.subscribe((userSession: UserSession) => {
        if(typeof userSession !== 'boolean' && this.router.url === '/signup') {
          this.router.navigate(['/events']);
        } 
      });
  }

  onSubmit(userSignup: UserSignup) {
    this.signup(userSignup);
  }

  ngOnInit() {
  }
 
}
