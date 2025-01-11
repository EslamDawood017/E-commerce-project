import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/Products/product.service';
import { Category } from '../../../Models/Category';
import { CategoryService } from '../../../shared/services/category.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule , NgFor],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  categoreis : Category[] = []

  productFrom : FormGroup;
  selectedFile : File |null = null ;
  constructor(
    private formBuilder :FormBuilder ,
    private productService : ProductService , 
    private categoryService: CategoryService
  ) 
  {
    this.productFrom = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      Category:[null ,Validators.required],
      productImage: ['']
    });
  }
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(
      Result => {
        this.categoreis = Result;     
       },
      error => {
        console.log("Category not found" + error);
      }
    )
  }
  onFileSelected(event :Event)
  {
    const input = event.target as HTMLInputElement

    if(input.files && input.files.length >0)
    {
      this.selectedFile = input.files[0];
    }
  }
  
  onSubmit():void
  {
    if(this.productFrom.valid)
    {
      const imageFormData = new FormData();
      console.log('Selected Category ID:', );

      imageFormData.append('imageFile' , this.selectedFile! , this.selectedFile?.name)
      

      this.productService.uploadImage(imageFormData).subscribe(
        (response:any) => {
          const imagePath = response.filePath;

          const formData = new FormData()

          formData.append('name' , this.productFrom.get('name')?.value);
          formData.append('description' , this.productFrom.get('description')?.value);
          formData.append('price', this.productFrom.get('price')?.value);
          formData.append('stockQuantity', this.productFrom.get('stockQuantity')?.value);
          formData.append('categoryId', this.productFrom.get('Category')?.value);
          formData.append('productImage' , imagePath);
          this.productService.addNewProduct(formData).subscribe(
            ProductResponse => {
              this.productFrom.reset();
              this.selectedFile = null
              
            },
            error => console.error('Error adding product:', error)
          );
        },
        error => console.error('Error uploading image:', error)
      )
    }
  }
}
