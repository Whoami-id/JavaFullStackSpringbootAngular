import { ProductService } from './../../../../../angular-ecommerce/src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  product: Product[];

  constructor(private service: ProductServiceService) { }

  ngOnInit(): void {
    this.service.getPruduct().subscribe(
      data =>{
        this.product = data;
      }
    );
  }

}
