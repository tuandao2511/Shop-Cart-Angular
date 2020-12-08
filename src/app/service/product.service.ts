import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlApi } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { ProductInfo } from '../model/productInfo';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { 
    
  }

  // getProduct(page: number, size: number) : Observable<any>{
  //   const url=`${urlApi}/product?page=${page}&size=${size}`
  //   return this.http.get(url).pipe();
  // }

  // getDetail(id: string) : Observable<ProductInfo>{
  //   const url=`${urlApi}/product/${id}`;
  //   return this.http.get<ProductInfo>(url).pipe(
  //     catchError(_ => {
  //       console.log("Get Detail Failed");
  //       return of(new ProductInfo());
  //   })
  //   )
  // }

   getProduct(page: number, size: number) : Observable<any>{
     const url = `${urlApi}/product?page=${page}&size=${size}`
     return this.http.get(url).pipe();
   }

   getDetail(id: string): Observable<ProductInfo> {
     const url = `${urlApi}/product/${id}`;
     return this.http.get<ProductInfo>(url).pipe(
      catchError(_ => {
              console.log("Get Detail Failed");
              return of(new ProductInfo());
        })
     )
   }

   /* api: localhost:8080/api/category/0 */
   getProductCategory(type: number, page: number, size: number) : Observable<any>{
    const url = `${urlApi}/category/${type}?page=${page}&size=${size}`
    return this.http.get(url).pipe();
   }
}
