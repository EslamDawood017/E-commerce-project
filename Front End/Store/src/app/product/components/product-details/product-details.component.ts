import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Models/Product';
import { ProductService } from '../../services/Products/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { environment } from '../../../../Environment/environment';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  CurrentProduct! : Product ;
  loading:boolean = true;
  error :string | null =null;
  host = environment.LocalHostapiUrl;

  constructor(private _productService : ProductService , private _route : Router , private _activatedRoute : ActivatedRoute){

  }
  ngOnInit(): void {
    const ProductId = Number(this._activatedRoute.snapshot.paramMap.get('id'));

    if(ProductId){
      this._productService.getProductById(ProductId).subscribe(
        (product) => { console.log(product) ;
          this.CurrentProduct = product ;
          this.loading = false;
        },
        (error) => {console.log(`Product by id error is : ${error}`);
        this.error = 'Product not found.';
        this.loading = false;}
      )
    }
  }
  goBack() {
    this._route.navigateByUrl("/Products");
  }

  

}
