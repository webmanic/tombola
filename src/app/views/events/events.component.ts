import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { Events } from 'src/app/interfaces/events';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'tb-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public events: Array<Events>;

  constructor(private eventsService: EventsService) { 
    this.eventsService.getList()
    .subscribe((data: Array<Events>) => {
      this.events = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.status)
    });
  }

  ngOnInit() {
  }

}
