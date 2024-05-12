import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../shared/services/event.service';
import { AuthService } from '../../shared/services/auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss'
})
export class UpdateEventComponent {
  updateEventForm!: FormGroup;
  isLoggedIn = false;
  currentUser: any;
  event:any;
  id: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private eventService: EventService, 
    private authService: AuthService, private storageService: StorageService) { }

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams) {
      this.id = urlParams.get('id');
      if (this.id) {
          console.log(this.id);
      } else {
          console.error('Nincs id paraméter az URL query stringben');
      }
    } else {
        console.error('Nincs URL query string az URL-ben');
    }

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
    if (this.event != undefined) {
      this.updateEventForm = this.formBuilder.group({
        title: [this.event.title],
        location: [this.event.location],
        place_count: [this.event.place_count],
        general_ticket_price: [this.event.general_ticket_price],
        VIP_ticket_price: [this.event.VIP_ticket_price],
        priority_ticket_price: [this.event.priority_ticket_price],
        student_ticket_price: [this.event.student_ticket_price],
        child_ticket_price: [this.event.child_ticket_price],
        retired_ticket_price: [this.event.retired_ticket_price],
        startdate: [''], //this.event.startdate.toISOString().slice(0, 10)
        finishdate: [''], //this.event.finishdate.toISOString().slice(0, 10)
      });
    }

    // Date objektum létrehozása
    const myDate = new Date();
    const dateInput = document.getElementById('startdate') as HTMLInputElement;
    const formattedDate = myDate.toISOString().slice(0, 10);
    dateInput.value = formattedDate;

    const myDate2 = new Date();
    const dateInput2 = document.getElementById('finishdate') as HTMLInputElement;
    const formattedDate2 = myDate2.toISOString().slice(0, 10);
    dateInput2.value = formattedDate2;
  }

  onSubmit() {
    if (this.updateEventForm.valid) {

      if(this.updateEventForm.value.title.length == 0) {
        this.updateEventForm.value.title = this.event.title;
      }

      if(this.updateEventForm.value.location.length == 0) {
        this.updateEventForm.value.location = this.event.location;
      }

      if(this.updateEventForm.value.places_rows_count == 0) {
        this.updateEventForm.value.places_rows_count = this.event.places_rows_count;
      }

      if(this.updateEventForm.value.places_columns_count == 0) {
        this.updateEventForm.value.places_columns_count = this.event.places_columns_count;
      }

      if(this.updateEventForm.value.general_ticket_price == 0) {
        this.updateEventForm.value.general_ticket_price = this.event.general_ticket_price;
      }

      if(this.updateEventForm.value.VIP_ticket_price == 0) {
        this.updateEventForm.value.VIP_ticket_price = this.event.VIP_ticket_price;
      }

      if(this.updateEventForm.value.priority_ticket_price == 0) {
        this.updateEventForm.value.priority_ticket_price = this.event.priority_ticket_price;
      }

      if(this.updateEventForm.value.student_ticket_price == 0) {
        this.updateEventForm.value.student_ticket_price = this.event.student_ticket_price;
      }

      if(this.updateEventForm.value.child_ticket_price == 0) {
        this.updateEventForm.value.child_ticket_price = this.event.child_ticket_price;
      }

      if(this.updateEventForm.value.retired_ticket_price == 0) {
        this.updateEventForm.value.retired_ticket_price = this.event.retired_ticket_price;
      }

      /*if(this.updateEventForm.value.title.length != 0) {
        this.event.title = this.updateEventForm.value.title;
      }

      if(this.updateEventForm.value.location.length != 0) {
        this.event.location = this.updateEventForm.value.location;
      }

      if(this.updateEventForm.value.places_rows_count != 0) {
        this.event.places_rows_count = this.updateEventForm.value.places_rows_count;
      }

      if(this.updateEventForm.value.places_columns_count != 0) {
        this.event.places_columns_count = this.updateEventForm.value.places_columns_count;
      }

      if(this.updateEventForm.value.general_ticket_price != 0) {
        this.event.general_ticket_price = this.updateEventForm.value.general_ticket_price;
      }

      if(this.updateEventForm.value.VIP_ticket_price != 0) {
        this.event.VIP_ticket_price = this.updateEventForm.value.VIP_ticket_price;
      }

      if(this.updateEventForm.value.priority_ticket_price != 0) {
        this.event.priority_ticket_price = this.updateEventForm.value.priority_ticket_price;
      }

      if(this.updateEventForm.value.student_ticket_price != 0) {
        this.event.student_ticket_price = this.updateEventForm.value.student_ticket_price;
      }

      if(this.updateEventForm.value.child_ticket_price != 0) {
        this.event.child_ticket_price = this.updateEventForm.value.child_ticket_price;
      }

      if(this.updateEventForm.value.retired_ticket_price != 0) {
        this.event.retired_ticket_price = this.updateEventForm.value.retired_ticket_price;
      }*/

      console.log('Form data:', this.updateEventForm.value);
      this.eventService.updateEvent(this.updateEventForm.value, this.id).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/list-event');
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  goBack() {
    this.location.back();
  }
}
