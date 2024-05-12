import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:5000/app/user/getAllUsers', {withCredentials: true});
  }

  getUserById(id: string) {
    return this.http.get('http://localhost:5000/app/user/findUser?id=' + id, {withCredentials: true});
  }

  updateUser(user: User, id: string) {
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('firstname', user.firstname);
    body.set('lastname', user.lastname);
    body.set('nickname', user.nickname);
    body.set('address', user.address);
    body.set('phonenumber', user.phonenumber);

    return this.http.put('http://localhost:5000/app/user/updateUser?id=' + id, body, {withCredentials: true});
  }

  updatePassword(oldPassword: string, newPassword: string, id: string) {
    return this.http.put('http://localhost:5000/app/user/updatePassword?id=' + id, {oldPassword, newPassword}, {withCredentials: true});
  }

  deleteUser(id: string) {
    return this.http.delete('http://localhost:5000/app/user/deleteUser?id=' + id, {withCredentials: true});
  }
}
