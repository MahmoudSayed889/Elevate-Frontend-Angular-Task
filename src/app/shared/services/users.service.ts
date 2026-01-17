import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL:string = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseURL}/users`)
  }

  getUser(userID:number): Observable<any> {
    return this.http.get(`${this.baseURL}/users/${userID}`)
  }
}
