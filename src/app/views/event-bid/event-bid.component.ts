import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';
import { EventBets } from 'src/app/interfaces/event-bets';
import { UserService } from 'src/app/services/user/user.service';
import { EventTickets } from 'src/app/interfaces/event-tickets';

@Component({
  selector: 'tb-event-bid',
  templateUrl: './event-bid.component.html',
  styleUrls: ['./event-bid.component.scss']
})
export class EventBidComponent implements OnInit {

  public eventBets: EventBets = {} as EventBets;
  public ticketSelect: any = {};
  public price: number = 0;

  constructor(private route: ActivatedRoute, 
    private eventsService: EventsService,
    private userService: UserService) { 
  }

  addTicket(ticket: EventTickets) {
    if(ticket.selected) {
      this.ticketSelect[ticket.ticketNo] = ticket;
      this.price += this.eventBets.price;
    } else {
      delete this.ticketSelect[ticket.ticketNo];
      this.price -= this.eventBets.price;
    }
  }

  ticketSelected(ticket: EventTickets) {
    ticket.selected = ticket.selected ? false: true;
    this.addTicket(ticket);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.eventsService.getListId(id)
    .subscribe((data: EventBets) => {
      this.eventBets = data;
    })
  }

}
