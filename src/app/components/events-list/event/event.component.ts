import { Component, OnInit, Input } from '@angular/core';
import { Events } from 'src/app/interfaces/events';
import * as moment from 'moment';
import { DateTimeService } from 'src/app/services/dateTime/date-time.service';
import { Moment } from 'moment';

@Component({
  selector: 'tb-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: Events = {} as Events;

  public valid = false;
  public timeLeft: number = 0;
  public expiresDate: Moment;
  public withinTimeLimit: boolean = false;
  public width: number = 100;
  public time: number = 300;

  private dateValid = () => {
    const currentDate = moment();
    this.expiresDate = moment(this.event.expires);
    this.valid = this.dateTimeService.isDateEqualBeforeDate(currentDate, this.expiresDate);
  }

  constructor(private dateTimeService: DateTimeService) {

  }

  ngOnInit() {
    this.dateValid();
    this.dateTimeService.timeLeft(this.event.expires, (countDown: number) => {
      if (countDown >= 1 && countDown <= this.time) {
        this.withinTimeLimit = true;
        this.timeLeft = countDown;
        this.width = (this.timeLeft / this.time) * 100;
      } else if (countDown === 0) {
        this.valid = false;
        this.withinTimeLimit = false;
      }
    });
  }

}
