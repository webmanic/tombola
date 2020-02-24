import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
import { UserSession } from 'src/app/interfaces/user-session';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  public api: string = environment.api.path;

  constructor(private http: HttpClient,
    private userService: UserService) { 

  }

  bet = (userId: string, eventId: string, ticketNo: Array<number>) => {
    return this.http.post(`${this.api}/event/bet`, {
      userId,
      eventId,
      ticketNo
    });
  }

  pageValid = (id) => {
    return this.http.post(`${this.api}/event/valid/${id}`, {}).toPromise();
  }

  getList = () => {
    return this.http.get(`${this.api}/event/list`);
  }

  getListId = (id) => {
    const userSession = this.userService.getUserSession() as UserSession;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-UserId': userSession ? userSession.id: ''
      })
    };
    return this.http.get(`${this.api}/event/list/${id}`, httpOptions);
  }
}
