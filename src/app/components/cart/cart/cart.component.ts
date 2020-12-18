import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductInOrder } from 'src/app/model/productInOrder';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ValidationUtils } from 'src/app/utils/ValidationUtils';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/model/UserResponse';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(private cartService: CartService, private router: Router, 
    private userService : UserService) { }
  

  productsInOrder : ProductInOrder[]=  [];
  price = 0;
  changeQuantitySubject : Subject<ProductInOrder> = new Subject<ProductInOrder>();
  changeQuantitySubcription: Subscription;
  currentUser: UserResponse;
  ngOnInit(): void {
    this.currentUser = this.userService.currentUserSubject.value;
    this.cartService.getCart().subscribe( productsCart => {
      this.productsInOrder = productsCart;
    })
    this.calculateTotalPrice();
    this.changeQuantitySubcription = this.changeQuantitySubject.pipe(
      debounceTime(1000),
      switchMap(productInOrder => {
        return this.cartService.update(productInOrder);
      })
    )
    .subscribe( pOD => {
      console.log('pOD ' + pOD);
      if (!pOD) { 
        throw new Error(); 
      }
    })
  }

  calculateTotalPrice() {
    let localPrice = 0;
    this.productsInOrder.forEach((prodInOrder, index) => {
      localPrice += prodInOrder.productPrice * prodInOrder.count;
    })
    this.price = localPrice;
  }

  onChange(productInOrder: ProductInOrder) {
    // console.log('productInOrder ' + JSON.stringify(productInOrder));
    ValidationUtils.validateCount(productInOrder);
    this.calculateTotalPrice();
    this.changeQuantitySubject.next(productInOrder);
  }

  ngOnDestroy(): void {
    if(this.changeQuantitySubcription!=null) {
      this.changeQuantitySubcription.unsubscribe();
    }
  }

  checkout() {
    if(this.currentUser == null) {
      this.router.navigateByUrl('/login')
    } else {
      this.cartService.checkout().subscribe(_ => {
        this.productsInOrder = [];
      }, error => {
        console.log('Checkout Cart Failed');
      });
      this.router.navigateByUrl('/');
    }
  }

}
