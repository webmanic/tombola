import { Injectable } from '@angular/core';
import { Alerts } from 'src/app/interfaces/alerts';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  public alerts: Array<Alerts> = [];

  constructor() { }

  alert = (type: string = 'info', message: string) => {
    this.alerts.push({
      type,
      message
    });
  }

  clear = (alert: Alerts) => {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
