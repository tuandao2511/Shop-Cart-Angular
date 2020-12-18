import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlApi } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { 

  }

  private orderUrl = `${urlApi}/order`;


  getPage(page = 1, size = 10): Observable<any> {
    return this.http.get(`${this.orderUrl}?page=${page}&size=${size}`).pipe();
  }
}
