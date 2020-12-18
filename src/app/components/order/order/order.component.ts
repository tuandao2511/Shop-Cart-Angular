import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

    this.orderService.getPage(1, 10).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });

  }

}
