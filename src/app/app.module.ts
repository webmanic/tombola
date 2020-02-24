import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routers/app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './views/events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventComponent } from './components/events-list/event/event.component';
import { EventBidComponent } from './views/event-bid/event-bid.component';
import { FormatCurrency } from './pipe/formatCurrency';
import { EventTicketsComponent } from './components/event-tickets/event-tickets.component';
import { PageNavComponent } from './views/page-nav/page-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsComponent } from './components/alerts/alerts.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { EventTicketComponent } from './components/event-tickets/event-ticket/event-ticket.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventsListComponent,
    EventComponent,
    EventBidComponent,
    FormatCurrency,
    EventTicketsComponent,
    PageNavComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AlertsComponent,
    SignUpComponent,
    EventTicketComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
