import { Component, OnInit, Input } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'tb-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() timeLeft: number = 0;
  @Input() expires: Moment;
  @Input() time: number = 0;
  @Input() width: number = 100;
  @Input() withinTimeLimit: boolean = false;

  constructor() { 
  }

  ngOnInit() {
  }

}
