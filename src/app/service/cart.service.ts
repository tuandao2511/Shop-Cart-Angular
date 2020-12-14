import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProductInOrder } from '../model/productInOrder';
import { UserService } from './user.service';
import { UserResponse } from '../model/UserResponse';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlApi } from 'src/environments/environment';
import { Cart } from '../model/Cart';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  currentUser: UserResponse;
  localMap = {};
  private cartUrl = `${urlApi}/cart`;

  constructor(private cookieService: CookieService, private userService: UserService, private http: HttpClient) { 
    this.currentUser = userService.currentUserSubject.value;
  }

  addItem(productInOrder: ProductInOrder) : Observable<boolean>{
    if(this.currentUser!=null) {
      const url = `${this.cartUrl}/add`;
      return this.http.post<boolean>(url, {
          'quantity': productInOrder.count,
          'productId': productInOrder.productId
      });
    } else {
      if(this.cookieService.check('cart')) {
        this.localMap = JSON.parse(this.cookieService.get('cart'));
      }

      if(!this.localMap[productInOrder.productId]) {
        this.localMap[productInOrder.productId] = productInOrder;
      } else{
        this.localMap[productInOrder.productId].count += productInOrder.count;
      }
      this.cookieService.set('cart', JSON.stringify(this.localMap));
      return of(true);
    }
  }

  getCart() : Observable<ProductInOrder[]> {
    let localCart = this.getLocalCart();
    if(this.currentUser!=null) {
      if(localCart.length > 0) {
        return this.http.post<Cart>(this.cartUrl, localCart).pipe(
          tap(cart => {
            console.log('co cart local ' + JSON.stringify(cart));
            this.clearLocalCart();
          }),
          map(cart => cart?.products),
          catchError(_ => of([]))
        ) 
      } else {
        return this.http.get<Cart>(this.cartUrl).pipe(
          tap(cart => {
            console.log('khong co cart local ' + JSON.stringify(cart));
          }),
          map(data => data?.products)
        )
      }
    } else {
      return of(localCart);
    }
  }

  private getLocalCart(): ProductInOrder[] {
    if(this.cookieService.check('cart')) {
      this.localMap = JSON.parse(this.cookieService.get('cart'));
      return Object.values(this.localMap);
    } else {
      this.localMap = {};
      return [];
    }
  }

  clearLocalCart() {
    this.localMap = {};
    this.cookieService.delete('cart');
  }
}
