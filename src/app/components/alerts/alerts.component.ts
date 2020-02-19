import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { Alerts } from 'src/app/interfaces/alerts';

@Component({
  selector: 'tb-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  public alerts: Array<Alerts> = [];

  constructor(private alertsService: AlertsService) {
    this.alerts = this.alertsService.alerts;
  }

  close(alert: Alerts) {
    this.alertsService.clear(alert);
  }

  ngOnInit() {
  }

}
