import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketBuyingHistoryService } from '../../shared/services/ticket-buying-history.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-add-ticket-buying-history',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-ticket-buying-history.component.html',
  styleUrl: './add-ticket-buying-history.component.scss'
})
export class AddTicketBuyingHistoryComponent implements OnInit {
  addTicketForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private location: Location, private ticketBuyingHistoryService: TicketBuyingHistoryService) { }

  ngOnInit() {
    this.addTicketForm = this.formBuilder.group({
      place_count: [0, [Validators.required]],
      purchased_ticket_type: ['', [Validators.required]]
    });
  }


  onSubmit() {
    if (this.addTicketForm.valid) {
      console.log('Form data:', this.addTicketForm.value);
      /*this.eventService.addEvent(this.addEventForm.value, '1').subscribe({
        next: (data) => {
          console.log(data);
        }, error: (err) => {
          console.log(err);
        }
      });*/
    } else {
      console.log('Form is not valid.');
    }
  }

  goBack() {
    this.location.back();
  }

}
