import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketSales } from '../model/TicketSales';

@Injectable({
  providedIn: 'root'
})
export class TicketSalesService {

  constructor(private http: HttpClient) { }

  getAllTicketSales() {
    return this.http.get<TicketSales[]>('http://localhost:5000/app/ticket-sales/getAllTicketSales', {withCredentials: true});
  }

  addTicketSales(ticketSales: TicketSales, event: Event) {
    const body = new URLSearchParams();
    body.set('event', JSON.stringify(event));
    body.set('place_count', ticketSales.place_count.toString());
    body.set('sold_general_ticket', ticketSales.sold_general_ticket.toString());
    body.set('sold_VIP_ticket', ticketSales.sold_VIP_ticket.toString());
    body.set('sold_priority_ticket', ticketSales.sold_priority_ticket.toString());
    body.set('sold_student_ticket', ticketSales.sold_student_ticket.toString());
    body.set('sold_child_ticket', ticketSales.sold_child_ticket.toString());
    body.set('sold_retired_ticket', ticketSales.sold_retired_ticket.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/ticket-sales/addTicketSales', body, {headers: headers, withCredentials: true});
  }

  getTicketSalesByEventId(id: number) {
    return this.http.get('http://localhost:5000/app/ticket-sales/findTicketSales?id=' + id, {withCredentials: true});
  }

  updateTicketSales(ticketSales: TicketSales, event: Event) {
    const body = new URLSearchParams();
    body.set('event', JSON.stringify(event));
    body.set('place_count', ticketSales.place_count.toString());
    body.set('sold_general_ticket', ticketSales.sold_general_ticket.toString());
    body.set('sold_VIP_ticket', ticketSales.sold_VIP_ticket.toString());
    body.set('sold_priority_ticket', ticketSales.sold_priority_ticket.toString());
    body.set('sold_student_ticket', ticketSales.sold_student_ticket.toString());
    body.set('sold_child_ticket', ticketSales.sold_child_ticket.toString());
    body.set('sold_retired_ticket', ticketSales.sold_retired_ticket.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.put('http://localhost:5000/app/ticket-sales/updateTicketSales', {body}, {withCredentials: true});
  }
}
