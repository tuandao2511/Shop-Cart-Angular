import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../model/User';
import { urlApi } from 'src/environments/environment';
import { UserResponse } from '../model/UserResponse';
import { tap, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  currentUserSubject: BehaviorSubject<UserResponse>;
  
  constructor(private http: HttpClient, private cookieService: CookieService) { 
    const user = localStorage.getItem('currentUser');
    cookieService.set('currentUser', user);
    this.currentUserSubject = new BehaviorSubject<UserResponse>(JSON.parse(user));
  }

  register(user: User): Observable<User>{
    const url = `${urlApi}/register`;
    return this.http.post<User>(url, user);
  }

  login(userLoginData) : Observable<UserResponse>{
    const url = `${urlApi}/login`;
    return this.http.post<UserResponse>(url, userLoginData).pipe(
      tap(userResponse => {
        console.log('da luu cookie 1')
          if(userResponse!=null && userResponse.token!=null) {
            console.log('da luu cookie 2')
            this.cookieService.set('currentUser', JSON.stringify(userResponse));
            if(userLoginData.remembered) {
              localStorage.setItem('currentUser', JSON.stringify(userResponse))
            }
          }
      }),
      catchError(this.handleError('Login Failed', null))
    )
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.cookieService.delete('currentUser');
  }

  getProfile(email: string) : Observable<User>{
    const url = `${urlApi}/profile/${email}`;
    return this.http.get<User>(url);
  }

  editProfile(user: User) : Observable<User>{
    const url = `${urlApi}/profile`;
    return this.http.put<User>(url, user); 
  }


  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

          console.log(error); // log to console instead

          // Let the app keep running by returning an empty result.
          return of(result as T);
      };
  }
}
