import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from '../views/events/events.component';
import { EventBidComponent } from '../views/event-bid/event-bid.component';
import { EventPageValidService } from '../services/resolver/event-page-valid/event-page-valid.service';
import { SignUpValidService } from '../services/resolver/sign-up-valid/sign-up-valid.service';
import { PageNavComponent } from '../views/page-nav/page-nav.component';
import { SignUpComponent } from '../views/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'prefix'
  },
  {
    path: 'events',
    component: PageNavComponent,
    children: [
      {
        path: '',
        component: EventsComponent
      },
      {
        path: 'signup',
        component: SignUpComponent,
        resolve: {
          pageValid: SignUpValidService
        }
      },
      {
        path: 'valid/:id',
        component: EventBidComponent,
        resolve: {
          pageValid: EventPageValidService
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
