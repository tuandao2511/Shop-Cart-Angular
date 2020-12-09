import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'shop-cart';

  products: any = [];  
  //di
  constructor(private productService: ProductService, 
    private router: ActivatedRoute) { 

  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    //component duoc tao
    this.router.params.subscribe(() => {
      console.log('ngOnInit');
      
      this.update();
    }); 
  }

  /*mục đích dùng để nhận diện và xử lý 2 case là get tất cả product (hiện không chưa phân page)
  và get theo category. 
   */
  update() {
    /* lấy ra đường đường path (this.router.snapshot.url trả về mảng nhé) của route ví dụ
    http://localhost:4200/product  url[0].path --> product
    http://localhost:4200/category/0 url[0].path --> category , url[1].path -->0
    */
    const path = this.router.snapshot.url[0].path;
    console.log('path ' + path);
    
    if(path === 'product') {
      this.getProducts(1,3);
    } else {
      const type = this.router.snapshot.url[1].path
      console.log('type ' + type);
      this.getCategory(+type, 1, 3);
    }
  }


  getProducts(page: number, size: number) {
   this.productService.getProduct(page, size)
    .subscribe(
      data => {
        console.log('data ' + JSON.stringify(data));
        this.products = data?.content;
      },
      function(err) {
        console.log('err ' + err);
      } 
    )
  }

  getCategory(type: number, page: number, size: number) {
    this.productService.getProductCategory(type, page, size).subscribe(
      data => {
        console.log('data ' + JSON.stringify(data));
        
        this.title = data?.category;
        this.products = data?.page?.content;
      },
      function(err) {
        console.log('err ' + err);
      }
    )
  }
}
