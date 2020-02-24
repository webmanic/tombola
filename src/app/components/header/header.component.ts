import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { UserSession } from 'src/app/interfaces/user-session';

@Component({
  selector: 'tb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showLogin: boolean = false;
  public userSession: UserSession | boolean = {} as UserSession;

  constructor(private userService: UserService) { 
    const userSession: UserSession | boolean =  this.userService.getUserSession();
    this.userService.authorized.subscribe((userSession: UserSession) => {
      if(typeof userSession !== 'boolean') {
        this.userSession = userSession;
        this.showLogin = false;
      } else {
        this.userSession = userSession;
      }
    });
    this.userService.authorized.emit(userSession);
  }

  onShowLogin(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showLogin = true;
  }

  logout() {
    this.userService.logout();
    this.showLogin = false;
    this.userService.authorized.emit(false);
  }

  ngOnInit() {
  }

}
