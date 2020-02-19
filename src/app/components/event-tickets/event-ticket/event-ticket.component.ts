import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventTickets } from 'src/app/interfaces/event-tickets';

@Component({
  selector: 'tb-event-ticket',
  templateUrl: './event-ticket.component.html',
  styleUrls: ['./event-ticket.component.scss']
})
export class EventTicketComponent implements OnInit {

  @Input() ticket: EventTickets = {} as EventTickets;
  @Output() ticketSelect: EventEmitter<EventTickets> = new EventEmitter(); 

  constructor() { }

  ticketSelected(ticket: EventTickets) {
    if(!ticket.disabled) {
      this.ticketSelect.emit(ticket);
    }
  }

  ngOnInit() {
  }

}
