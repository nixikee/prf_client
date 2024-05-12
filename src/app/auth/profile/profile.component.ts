import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,
    MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;
  currentUser: any;
  username!: string;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userService.getUserById(this.storageService.getUser()).subscribe({
        next: (data) => {
          if (data) {
            this.currentUser = data;
            this.username = this.currentUser.firstname + this.currentUser.lastname;
          }
        }, error: (err) => {
          console.log(err);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.router.navigateByUrl('/home');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
