import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { User } from './shared/model/User';
import { UserService } from './shared/services/user.service';
import { StorageService } from './shared/services/storage.service';
import { GetEventDetailsComponent } from './event/get-event-details/get-event-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    MatButtonModule, 
    MatMenuModule,
    LoginComponent,
    SignupComponent,
    GetEventDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Events';
  
  private role: any;
  isLoggedIn = false;
  currentUser: any;
  isAdmin = false;
  isUser = false;
  username!: string;
  
  constructor(private authService: AuthService, private userService: UserService, private router: Router, 
    private storageService: StorageService) { }
  
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userService.getUserById(this.storageService.getUser()).subscribe({
        next: (data) => {
          if (data) {
            this.currentUser = data;
            this.username = this.currentUser.firstname + ' ' + this.currentUser.lastname;
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
  
  logout(): void {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.storageService.clean();
        this.isLoggedIn = false;
        this.storageService.home();
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
