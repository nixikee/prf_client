import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {
  updateUserForm!: FormGroup;
  currentUser: any;
  user: any;
  isLoggedIn = false;

  constructor(private formBuilder: FormBuilder, private location: Location, private userService: UserService, 
    private authService: AuthService, private storageService: StorageService) { }

  ngOnInit() {
    this.updateUserForm = this.formBuilder.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      nickname: [''],
      birthdate: [''],
      address: [''],
      phonenumber: [''],
      role: [''],
      password: [''],
      confirmPassword: ['']
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.updateUserForm.valid) {
      console.log('Form data:', this.updateUserForm.value);
      this.authService.signup(this.updateUserForm.value).subscribe({
        next: (data) => {
          console.log(data);
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

  /*ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const currentUser = this.storageService.getUser();
      this.userService.getUserById(this.currentUser).subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
            this.user = data;
          }
        }, error: (err) => {
          console.log(err);
        }
      });
    }

    this.updateUserForm = this.formBuilder.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      nickname: [''],
      address: [''],
      phonenumber: [''],
      birthdate: [''],
      role: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.updateUserForm.valid) {
      console.log('Form data:', this.updateUserForm.value);
      this.userService.updateUser(this.updateUserForm.value, this.currentUser.id).subscribe({
        next: (data) => {
          console.log(data);
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
  }*/
}
