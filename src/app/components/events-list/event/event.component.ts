import { Component, OnInit, Input } from '@angular/core';
import { Events } from 'src/app/interfaces/events';
import * as moment from 'moment';

@Component({
  selector: 'tb-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: Events = {} as Events;

  public valid = false;

  constructor() { 
    
  }

  ngOnInit() {
    const currentDate = moment();
    const expiresDate = moment(this.event.expires);
    if(currentDate <= expiresDate){
      this.valid = true;
    }
  }

}
