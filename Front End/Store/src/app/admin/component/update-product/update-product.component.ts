import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../Models/Category';
import { CategoryService } from '../../../shared/services/category.service';
import { CommonModule, NgFor } from '@angular/common';
import { ProductService } from '../../../product/services/Products/product.service';
import { Product } from '../../../Models/Product';
import { UpdateProductService } from '../../services/update-product.service';
import { environment } from '../../../../Environment/environment';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [NgFor , ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {

  categoreis : Category[] = [];
  updatedProduct! : Product ;
  productFrom! : FormGroup;
  selectedFile : File |null = null ;
  imageDoamin = environment.LocalHostapiUrl;


  constructor(private UpdateService : UpdateProductService ,
     private formBuilder :FormBuilder , private categoryService : CategoryService ,
     private productService : ProductService){
      
      this.updatedProduct = this.UpdateService.getProduct();
     }

  
  ngOnInit(): void {

      

      this.productFrom = this.formBuilder.group({
      name: [this.updatedProduct.name, Validators.required],
      description: [this.updatedProduct.description, Validators.required],
      price: [this.updatedProduct.price, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [this.updatedProduct.stockQuantity, [Validators.required, Validators.min(0)]],
      Category:[this.updatedProduct.categoryId ,Validators.required],
      productImage: []
    })

    this.categoryService.getAllCategory().subscribe(
      Result => {
        this.categoreis = Result;     
       },
      error => {
        console.log("Category not found" + error);
      }
    )
  }


  
  onSubmit():void
  {
    if(this.productFrom.valid)
    { 
          this.updatedProduct.name = this.productFrom.get('name')?.value;
          this.updatedProduct.description = this.productFrom.get('description')?.value;
          this.updatedProduct.price = this.productFrom.get('price')?.value;
          this.updatedProduct.stockQuantity = this.productFrom.get('stockQuantity')?.value;
          this.updatedProduct.categoryId = this.productFrom.get('Category')?.value;
         
          this.productService.UpdateProduct(this.updatedProduct.id , this.updatedProduct).subscribe( {
            next :  () => {
              Swal.fire({
                    icon: 'success',
                    title: 'Item Updated',
                    text: 'Product Updated successfully!',
                    confirmButtonText: 'OK'
                  });
            },
            error : (error) => {console.error('Error updating product:', error)}
          });
    }
  }

}
