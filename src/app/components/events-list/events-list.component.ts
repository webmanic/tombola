import { Component, OnInit, Input } from '@angular/core';
import { Events } from 'src/app/interfaces/events';

@Component({
  selector: 'tb-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  @Input() events: Array<Events> = [];

  constructor() { }

  ngOnInit() {
  }

}
