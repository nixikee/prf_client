import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/User';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatDialogModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent implements OnInit {
  users!: User[];
  columns = ['email', 'name', 'nickname', 'birthdate', 'address', 'phonenumber', 'role', 'delete']

  constructor(private userService: UserService, private authService: AuthService, 
    private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      }, error: err => {
        console.log(err);
      }
    });
  }

  deleteUser(id: string, n: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          // user deletion
          console.log(data);
          this.userService.deleteUser(id).subscribe({
            next: (data) => {
              console.log(data);
              this.users?.splice(n, 1);
              this.users = [...this.users];
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
