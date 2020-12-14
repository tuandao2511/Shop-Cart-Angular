import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductInOrder } from 'src/app/model/productInOrder';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  productsInOrder : ProductInOrder[]=  [];
  price = 0;

  ngOnInit(): void {
    this.cartService.getCart().subscribe( productsCart => {
      this.productsInOrder = productsCart;
    })
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let localPrice = 0;
    this.productsInOrder.forEach((prodInOrder, index) => {
      localPrice += prodInOrder.productPrice * prodInOrder.count;
    })
    this.price = localPrice;
  }

  onChange() {
    this.calculateTotalPrice();
  }

}
