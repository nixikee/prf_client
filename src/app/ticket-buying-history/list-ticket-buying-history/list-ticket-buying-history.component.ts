import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TicketBuyingHistory } from '../../shared/model/TicketBuyingHistory';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { TicketBuyingHistoryService } from '../../shared/services/ticket-buying-history.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-list-ticket-buying-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatDialogModule],
  templateUrl: './list-ticket-buying-history.component.html',
  styleUrl: './list-ticket-buying-history.component.scss'
})
export class ListTicketBuyingHistoryComponent implements OnInit {
  ticketBuyingHistory!: any;
  userHistory!: TicketBuyingHistory[];
  currentUser!: any;
  columns = ['event', 'place_count', 'purchased_ticket_type', 'delete']

  constructor(private userService: UserService, private authService: AuthService, private ticketBuyingHistoryService: TicketBuyingHistoryService,
    private router: Router, private dialog: MatDialog, private storageService: StorageService) {}

  ngOnInit(): void {
    this.userService.getUserById(this.storageService.getUser()).subscribe({
      next: (data) => {
        this.currentUser = data;
      }, error: (err: any) => {
        console.log(err);
      }
    });

    this.ticketBuyingHistoryService.getTicketBuyingHistory(this.storageService.getUser()).subscribe({
      next: (data) => {
        this.ticketBuyingHistory = data;
        //this.userHistory[0] = this.ticketBuyingHistory[0];
        //for (let i = 0; i < this.ticketBuyingHistory.length; i++) {
          /*if (this.ticketBuyingHistory[i].user._id == this.currentUser._id) {
            this.userHistory.push(this.ticketBuyingHistory[i]);
          }*/
          //this.userHistory = [...this.userHistory, this.ticketBuyingHistory[i]];
          
        //}
      }, error: err => {
        console.log(err);
      }
    });
  }

  deleteTicketBuyingHistory(id: string, n: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.ticketBuyingHistoryService.deleteTicketBuyingHistory(id).subscribe({
            next: (data) => {
              console.log(data);
              this.ticketBuyingHistory?.splice(n, 1);
              this.ticketBuyingHistory = [...this.ticketBuyingHistory];
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
