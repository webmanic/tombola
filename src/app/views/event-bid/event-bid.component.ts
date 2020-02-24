import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';
import { EventBets } from 'src/app/interfaces/event-bets';
import { UserService } from 'src/app/services/user/user.service';
import { EventTickets } from 'src/app/interfaces/event-tickets';
import * as moment from 'moment';
import { DateTimeService } from 'src/app/services/dateTime/date-time.service';
import { UserSession } from 'src/app/interfaces/user-session';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'tb-event-bid',
  templateUrl: './event-bid.component.html',
  styleUrls: ['./event-bid.component.scss']
})
export class EventBidComponent implements OnInit {

  public eventBets: EventBets = {} as EventBets;
  public price: number = 0;
  public percentageWinning: number = 0;
  public valid = false;
  public withinTimeLimit: boolean = false;
  public width: number = 100;
  public time: number = 300;
  private ticketAvailable = 0;
  private ticketBet = 0;
  private isLoggedIn = false;
  private ticketNoSelected: Array<number> = [];

  private dateValid = (event) => {
    const currentDate = moment();
    const expiresDate = moment(event.expires);
    this.valid = this.dateTimeService.isDateEqualBeforeDate(currentDate, expiresDate);
  }

  private timeLeftCount = () => {
    this.dateTimeService.timeLeft(this.eventBets.expires, (countDown: number) => {
      if (countDown >= 1 && countDown <= this.time) {
        this.dateValid(this.eventBets);
        this.withinTimeLimit = true;
        this.width = (countDown / this.time) * 100;
      } else if (countDown === 0) {
        this.valid = false;
        this.withinTimeLimit = false;
      }
    });
  }

  private ticketBetCount = () => {
    this.price = 0;
    this.percentageWinning = 0;
    this.ticketBet = 0;
    this.ticketAvailable = 0;
    this.ticketNoSelected = [];
    this.eventBets.tickets.forEach((e: EventTickets) => {
      this.ticketAvailable += 1;
      if (e.owner || e.selected) {
        this.ticketBet += 1;
      }
      if(e.selected) {
        this.price += this.eventBets.price;
        if((this.ticketBet % this.eventBets.priceIncrease) === 0) {
          this.price += this.price * (this.eventBets.pricePercentage / 100);
        }
        this.ticketNoSelected.push(e.ticketNo);
      }
      
    })
    this.calculatePercentage();
  }

  private calculatePercentage = () => {
    this.percentageWinning = (this.ticketBet / this.ticketAvailable) * 100;
  }

  private clearTicketSelected = () => {
    this.eventBets.tickets.forEach((eventTickets: EventTickets) => {
      eventTickets.selected = false;
    });
    this.ticketBetCount();
  }

  private getListId() {
    const id = this.route.snapshot.params['id'];
    this.eventsService.getListId(id)
      .subscribe((data: EventBets) => {
        this.eventBets = data;
        this.dateValid(data);
        this.timeLeftCount();
        this.ticketBetCount();
      })
  }

  constructor(private route: ActivatedRoute,
    private eventsService: EventsService,
    private userService: UserService,
    private dateTimeService: DateTimeService,
    private alertsService: AlertsService) {
      this.isLoggedIn = this.userService.getUserSession() ? true: false;
      this.userService.authorized.subscribe((userSession: UserSession | boolean) => {
        if(typeof userSession === 'boolean') {
          this.clearTicketSelected();
          this.isLoggedIn = false;
          this.getListId();
        } else {
          this.isLoggedIn = true;
          this.getListId();
        } 
      });
  }

  ticketSelected(ticket: EventTickets) {
    if(this.isLoggedIn) {
      ticket.selected = ticket.selected ? false : true;
      this.ticketBetCount();
    } else {
      this.alertsService.alert('warning', 'Please Login to purchase tickets');
    }
  }

  bet() {
    const userSession: UserSession | boolean = this.userService.getUserSession();
    if(userSession !== false) {
      this.eventsService.bet(userSession.id, this.eventBets._id, this.ticketNoSelected)
      .subscribe((data) => {
        this.getListId();
        this.alertsService.alert('info', 'Ticket Bet Successfully Booked');
      }, (error) => {
        this.getListId();
        this.alertsService.alert('warning', error.error.message);
      })
    }
  }

  ngOnInit() {
    this.getListId();
  }

}
