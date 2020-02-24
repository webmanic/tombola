import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EventTickets } from 'src/app/interfaces/event-tickets';
import { UserService } from 'src/app/services/user/user.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'tb-event-tickets',
  templateUrl: './event-tickets.component.html',
  styleUrls: ['./event-tickets.component.scss']
})
export class EventTicketsComponent implements OnInit {

  @Input() tickets: Array<EventTickets> = [];
  @Output() ticketSelect: EventEmitter<EventTickets> = new EventEmitter(); 


  constructor() { }

  ticketSelected(ticket: EventTickets) {
    this.ticketSelect.emit(ticket);
  }

  ngOnInit() {
  }

}
