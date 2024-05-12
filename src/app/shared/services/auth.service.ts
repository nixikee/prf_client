import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/auth/login', body, {headers: headers, withCredentials: true});
  }

  signup(user: User) {
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('firstname', user.firstname);
    body.set('lastname', user.lastname);
    body.set('nickname', user.nickname);
    body.set('birthdate', user.birthdate.toString());
    body.set('address', user.address);
    body.set('phonenumber', user.phonenumber);
    body.set('role', user.role);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/auth/register', body, {headers: headers});
  }

  logout() {
    return this.http.post('http://localhost:5000/app/auth/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/app/auth/checkAuth', {withCredentials: true});
  }
}
