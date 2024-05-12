import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../model/Event';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAllEvents() {
    return this.http.get<Event[]>('http://localhost:5000/app/event/getAllEvents', {withCredentials: true});
  }

  addEvent(event: Event, user: User) {
    const body = new URLSearchParams();
    console.log(JSON.stringify(user));
    body.set('creator', JSON.stringify(user));
    body.set('title', event.title);
    body.set('startdate', event.startdate.toString());
    body.set('finishdate', event.finishdate.toString());
    body.set('location', event.location);
    body.set('place_count', event.place_count.toString());
    body.set('general_ticket_price', event.general_ticket_price.toString());
    body.set('VIP_ticket_price', event.VIP_ticket_price.toString());
    body.set('priority_ticket_price', event.priority_ticket_price.toString());
    body.set('student_ticket_price', event.student_ticket_price.toString());
    body.set('child_ticket_price', event.child_ticket_price.toString());
    body.set('retired_ticket_price', event.retired_ticket_price.toString());
    body.set('image', event.image);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/event/addEvent', body, {headers: headers, withCredentials: true, responseType: "text"});
  }

  getEventsById(id: string) {
    return this.http.get('http://localhost:5000/app/event/findEventsByEvent?id=' + id, {withCredentials: true});
  }

  updateEvent(event: Event, user: User) {
    const body = new URLSearchParams();
    body.set('creator', JSON.stringify(user));
    body.set('title', event.title);
    body.set('startdate', event.startdate.toISOString());
    body.set('finishdate', event.finishdate.toISOString());
    body.set('location', event.location);
    body.set('place_count', event.place_count.toString());
    body.set('general_ticket_price', event.general_ticket_price.toString());
    body.set('VIP_ticket_price', event.VIP_ticket_price.toString());
    body.set('priority_ticket_price', event.priority_ticket_price.toString());
    body.set('student_ticket_price', event.student_ticket_price.toString());
    body.set('child_ticket_price', event.child_ticket_price.toString());
    body.set('retired_ticket_price', event.retired_ticket_price.toString());
    body.set('image', event.image);

    console.log(body.toString());

    return this.http.put('http://localhost:5000/app/event/updateEvent', {body}, {withCredentials: true});
  }

  deleteEvent(id: string) {
    return this.http.delete('http://localhost:5000/app/event/deleteEvent?id=' + id, {withCredentials: true});
  }
}
