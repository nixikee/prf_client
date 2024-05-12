import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketBuyingHistory } from '../model/TicketBuyingHistory';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class TicketBuyingHistoryService {

  constructor(private http: HttpClient) { }

  getTicketBuyingHistory(user_id: string) {
    return this.http.get<TicketBuyingHistory[]>('http://localhost:5000/app/ticket-buying-history/getAllTicketBuyingHistory?id=' + user_id, {withCredentials: true});
  }

  addTicketBuyingHistory(ticketBuyingHistory: TicketBuyingHistory, user: User, event: Event) {
    const body = new URLSearchParams();
    body.set('event', JSON.stringify(event));
    body.set('user', JSON.stringify(user));
    body.set('place_count', ticketBuyingHistory.place_count.toString());
    body.set('purchased_ticket_type', ticketBuyingHistory.purchased_ticket_type);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/ticket-buying-history/addTicketBuyingHistory', body, {headers: headers, withCredentials: true});
  }

  getTicketsBuyingHistoryByEventId(id: number) {
    return this.http.get('http://localhost:5000/app/ticket-buying-history/findTicketsBuyingHistory?id=' + id, {withCredentials: true});
  }

  updateTicketBuyingHistory(id: number, event: Event) {
    return this.http.put('http://localhost:5000/app/ticket-buying-history/updateTicketBuyingHistory?id=' + id, {event}, {withCredentials: true});
  }

  deleteTicketBuyingHistory(id: string) {
    return this.http.delete('http://localhost:5000/app/ticket-buying-history/deleteTicketBuyingHistory?id=' + id, {withCredentials: true});
  }
}
