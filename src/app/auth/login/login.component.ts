import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  
  isAdmin = false;
  isUser = false;

  user: any;
  role: any;

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private storageService: StorageService) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.userService.getUserById(this.storageService.getUser()).subscribe({
        next: (data) => {
          if (data) {
            this.user = data;
            this.role = this.user.role;
            console.log('Role', this.role);
            this.storageService.home();
          }
        }, error: (err) => {
          console.log(err);
        }
      });
    }
  }

  login() {
    if (this.email && this.password) {
      this.errorMessage = '';
      this.authService.login(this.email, this.password).subscribe({
        next: (data) => {
          if (data) {
            this.storageService.saveUser(data);
            console.log(data);
            this.isLoggedIn = true;
            this.userService.getUserById(this.storageService.getUser()).subscribe({
              next: (data) => {
                if (data) {
                  this.user = data;
                  this.role = this.user.role;
                  this.storageService.home();
                }
              }, error: (err) => {
                console.log(err);
              }
            });
            window.location.reload();
          }
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.errorMessage = 'Form is empty.';
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
