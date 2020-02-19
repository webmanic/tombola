import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpValidService implements Resolve<boolean>{

  constructor(private router: Router, private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const userSession = this.userService.getUserSession();
    if(userSession) {
      this.router.navigate(['/events']);
    } else {
      return true;
    }
  }
}
