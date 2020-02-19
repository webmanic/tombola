import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EventsService } from '../../events/events.service';

@Injectable({
  providedIn: 'root'
})

export class EventPageValidService implements Resolve<Promise<boolean>> {

  constructor(private eventsService: EventsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    let id = route.paramMap.get('id');

    return this.eventsService.pageValid(id)
    .then(() => {
      return true;
    }, () => {
      this.router.navigate(['/events']);
      return false
    });
  }
}
