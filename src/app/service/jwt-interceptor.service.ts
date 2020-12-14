import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {

  constructor(private userService: UserService) { 

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.userService.currentUserSubject.value;
    if(currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${currentUser.type} ${currentUser.token}`,
          'Content-Type': 'application/json'
        }
      })
    }
    return next.handle(req);
  }
}
