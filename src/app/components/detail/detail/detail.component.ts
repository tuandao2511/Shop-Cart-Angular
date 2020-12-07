import { Component, OnInit } from '@angular/core';
import { ProductInfo } from 'src/app/model/productInfo';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  title = "Product detail"
  products: any = [];

  product: ProductInfo = new ProductInfo();  
  count : number = 1;

  constructor(private route: ActivatedRoute, 
    private productService: ProductService) { 
    
  }
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id ' + id);
    this.getProduct(id);
  }

  ngDestroy(): void {

  }

  getProduct(id: string) {
    this.productService.getDetail(id).subscribe(
      _product => {
        console.log('_product ');
        this.product = _product;
      },
      function(err) {

      }
    )
  }

  validateCount() {
    console.log('Validate');
    const max = this.product.productStock;
    if (this.count > max) {
      this.count = max;
    } else if (this.count < 1) {
      this.count = 1;
    }
  }

  onSubmit() {
    console.log('khong thanh cong');
  }
}
