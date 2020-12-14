import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(private router: Router, private userService: UserService) { 

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(
        err => {
          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.userService.logout();
              this.router.navigate(['/login']);
          }
          const error = err.error || err.statusText;
          return throwError(error);
        }
      )
    )
  }
}
