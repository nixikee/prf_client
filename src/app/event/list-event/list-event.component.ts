import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Event } from '../../shared/model/Event';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { EventService } from '../../shared/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-event',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.scss'
})
export class ListEventComponent implements OnInit {
  events!: Event[];
  columns = ['title', 'startdate', 'finishdate', 'location', 'details']

  constructor(private eventService: EventService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        console.log(data);
        this.events = data;
      }, error: err => {
        console.log(err);
      }
    });
  }

  detailsEvent(id: string) {
    this.router.navigateByUrl('get-details-event?id=' + id);
  }

}
