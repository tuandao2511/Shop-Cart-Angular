import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { urlApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }

  register(user: User): Observable<User>{
    const url = `${urlApi}/register`;
    return this.http.post<User>(url, user);
  }
}
