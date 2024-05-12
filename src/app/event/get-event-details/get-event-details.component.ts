import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { EventService } from '../../shared/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-get-event-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './get-event-details.component.html',
  styleUrl: './get-event-details.component.scss'
})
export class GetEventDetailsComponent implements OnInit {
  isLoggedIn = false;
  currentUser: any;
  events: any;
  event: any;
  user: any;
  id: any;
  role: any;
  isAdmin = false;
  isUser = false;

  constructor(private eventService: EventService, private dialog: MatDialog, private userService: UserService, 
    private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
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

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userService.getUserById(this.storageService.getUser()).subscribe({
        next: (data) => {
          if (data) {
            this.currentUser = data;
            this.role = this.currentUser.role;
            if (this.role == 'ADMIN') {
              this.isAdmin = true;
            } else if (this.role == 'USER') {
              this.isUser = true;
            }
          }
        }, error: (err) => {
          console.log(err);
        }
      });
    }
  }

  updateEvent(id: string) {
    this.router.navigateByUrl('update-event?id=' + id);
  }

  buyTicket(id: string) {
    this.router.navigateByUrl('buy-ticket?id=' + id);
  }

  deleteEvent(id: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.eventService.deleteEvent(id).subscribe({
            next: (data) => {
              console.log(data);
              this.router.navigateByUrl('list-events');
            }, error: (err) => {
              console.log(err);
            }
          });
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}
