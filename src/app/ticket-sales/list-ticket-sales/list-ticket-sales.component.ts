import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { StorageService } from '../../shared/services/storage.service';
import { TicketSalesService } from '../../shared/services/ticket-sales.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-ticket-sales',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatDialogModule],
  templateUrl: './list-ticket-sales.component.html',
  styleUrl: './list-ticket-sales.component.scss'
})
export class ListTicketSalesComponent implements OnInit {
    ticketSales!: any;
    currentUser!: any;
    columns = ['event', 'place_count', 'sold_general_ticket', 'sold_VIP_ticket', 'sold_priority_ticket', 'sold_student_ticket',
      'sold_child_ticket', 'sold_retired_ticket']
  
    constructor(private userService: UserService, private authService: AuthService, private ticketSalesService: TicketSalesService,
      private router: Router, private dialog: MatDialog, private storageService: StorageService) {}
  
    ngOnInit(): void {

      this.userService.getUserById(this.storageService.getUser()).subscribe({
        next: (data) => {
          this.currentUser = data;
        }, error: (err: any) => {
          console.log(err);
        }
      });

      this.ticketSalesService.getAllTicketSales().subscribe({
        next: (data) => {
          this.ticketSales = data;
        }, error: err => {
          console.log(err);
        }
      });
    }
}
