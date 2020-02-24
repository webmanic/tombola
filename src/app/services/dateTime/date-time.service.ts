import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  isDateEqualBeforeDate = (dateA: Moment, dateB: Moment) => {
    if(dateA <= dateB){
      return true;
    }
    return false;
  }

  getBothDateCountDiff = (dateA: Moment, dateB: Moment) => {
    const a = dateA.unix();
    const b = dateB.unix();
    const total = b - a;
    return total >= 0 ? total : 0;
  }

  timeLeft = (expiresDate: Date, callback) => {
    const timer = setInterval(() => {
      const currentDate = moment();
      const timeLeft = this.getBothDateCountDiff(currentDate, moment(expiresDate));
      callback(timeLeft);
      if(timeLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  
}
