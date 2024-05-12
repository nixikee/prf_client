import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../shared/services/event.service';
import { CommonModule, Location } from '@angular/common';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent implements OnInit {
  addEventForm!: FormGroup;
  currentUser: any;

  constructor(private formBuilder: FormBuilder, private location: Location, private eventService: EventService, 
    private storageService: StorageService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getUserById(this.storageService.getUser()).subscribe({
      next: (data) => {
        this.currentUser = data;
      }, error: (err: any) => {
        console.log(err);
      }
    });

    this.addEventForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      startdate: ['', [Validators.required]],
      finishdate: ['', [Validators.required]],
      location: ['', [Validators.required]],
      place_count: [0],
      general_ticket_price: [0],
      VIP_ticket_price: [0],
      priority_ticket_price: [0],
      student_ticket_price: [0],
      child_ticket_price: [0],
      retired_ticket_price: [0],
      image: ['']
    });
  }

  onSubmit() {
    if (this.addEventForm.valid) {
      console.log('Form data:', this.addEventForm.value);
      console.log('Add', this.storageService.getUser());
      this.eventService.addEvent(this.addEventForm.value, this.currentUser).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/list-events');
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
