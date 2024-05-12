import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { EventService } from '../shared/services/event.service';
import { StorageService } from '../shared/services/storage.service';
import { UserService } from '../shared/services/user.service';
import { TicketBuyingHistoryService } from '../shared/services/ticket-buying-history.service';
import { TicketSalesService } from '../shared/services/ticket-sales.service';
import { TicketSales } from '../shared/model/TicketSales';

@Component({
  selector: 'app-buy-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.scss'
})
export class BuyTicketComponent implements OnInit {
  isLoggedIn = false;
  buyTicketForm!: FormGroup;
  currentUser: any;
  events!: any[];
  event!: any;
  id: any;
  ticketSales: any;
  newTicketSales: any;

  constructor(private formBuilder: FormBuilder, private location: Location, private eventService: EventService, 
    private storageService: StorageService, private userService: UserService, private router: Router, 
    private ticketBuyingHistoryService: TicketBuyingHistoryService, private ticketSalesService: TicketSalesService) {
  }

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get('id');

    if (this.id != null) {
      this.eventService.getEventsById(this.id).subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
            this.event = data;
          }
        }, error: (err) => {
          console.log(err);
        }
      });
    }
    
    this.userService.getUserById(this.storageService.getUser()).subscribe({
      next: (data) => {
        this.currentUser = data;
      }, error: (err: any) => {
        console.log(err);
      }
    });

    this.ticketSalesService.getAllTicketSales().subscribe({
      next: (data) => {
        console.log(data);
        this.events = data;
      }, error: err => {
        console.log(err);
      }
    });

    this.buyTicketForm = this.formBuilder.group({
      place_count: [0, [Validators.required]],
      purchased_ticket_type: ['', [Validators.required]]
    });

  }

  onSubmit() {
    if (this.buyTicketForm.valid) {
      console.log('Form data:', this.buyTicketForm.value);
      this.ticketBuyingHistoryService.addTicketBuyingHistory(this.buyTicketForm.value, this.currentUser, this.event).subscribe({
        next: (data) => {
          console.log(data);
          if (this.events.some(elem => elem == this.event)) {
            this.ticketSalesService.getTicketSalesByEventId(this.event.id).subscribe({
              next: (data) => {
                this.ticketSales = data;
              }, error: (err: any) => {
                console.log(err);
              }
            });
            this.updateTicketSales(this.ticketSales, this.event);
          } else {
            //this.addTicketSales(this.event);
          }
          this.router.navigateByUrl('/list-ticket-buying-history');
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  updateTicketSales(ticketSales: TicketSales, event: Event) {

      const count = this.buyTicketForm.value.place_count;
      if (this.buyTicketForm.value.purchased_ticket_type === "General ticket") {
        ticketSales.sold_general_ticket += count;
        this.ticketSalesService.updateTicketSales(ticketSales, this.event);
      } else if (this.buyTicketForm.value.purchased_ticket_type === "VIP ticket") {
        ticketSales.sold_VIP_ticket += count;
        this.ticketSalesService.updateTicketSales(ticketSales, this.event);
      } else if (this.buyTicketForm.value.purchased_ticket_type === "Priority ticket") {
        ticketSales.sold_priority_ticket += count;
        this.ticketSalesService.updateTicketSales(ticketSales, this.event);
      } else if (this.buyTicketForm.value.purchased_ticket_type === "Student ticket") {
        ticketSales.sold_student_ticket += count;
        this.ticketSalesService.updateTicketSales(ticketSales, this.event);
      } else if (this.buyTicketForm.value.purchased_ticket_type === "Child ticket") {
        ticketSales.sold_child_ticket += count;
        this.ticketSalesService.updateTicketSales(ticketSales, this.event);
      } else if (this.buyTicketForm.value.purchased_ticket_type === "Retired ticket") {
        ticketSales.sold_retired_ticket += count;
        this.ticketSalesService.updateTicketSales(ticketSales, this.event);
      }

    this.ticketSalesService.updateTicketSales(ticketSales, this.event).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/list-ticket-sales');
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  addTicketSales(event: Event) {
    const count = this.buyTicketForm.value.place_count;
    this.newTicketSales.event = event;
    this.newTicketSales.place_count = this.newTicketSales.event.place_count;
    if (this.buyTicketForm.value.purchased_ticket_type === "General ticket") {
      this.newTicketSales.sold_general_ticket = count;
    } else if (this.buyTicketForm.value.purchased_ticket_type === "VIP ticket") {
      this.newTicketSales.sold_VIP_ticket = count;
    } else if (this.buyTicketForm.value.purchased_ticket_type === "Priority ticket") {
      this.newTicketSales.sold_priority_ticket = count;
    } else if (this.buyTicketForm.value.purchased_ticket_type === "Student ticket") {
      this.newTicketSales.sold_student_ticket = count;
    } else if (this.buyTicketForm.value.purchased_ticket_type === "Child ticket") {
      this.newTicketSales.sold_child_ticket = count;
    } else if (this.buyTicketForm.value.purchased_ticket_type === "Retired ticket") {
      this.newTicketSales.sold_retired_ticket = count;
    }

    this.ticketSalesService.addTicketSales(this.newTicketSales, this.event).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/list-ticket-sales');
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
