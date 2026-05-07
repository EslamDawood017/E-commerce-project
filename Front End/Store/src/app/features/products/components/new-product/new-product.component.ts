import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../../shared/services/product.service';
import { Category } from '../../../../shared/models/Category';
import { CategoryService } from '../../../../shared/services/category.service';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent implements OnInit {
  categoreis: Category[] = [];

  productFrom: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {
    this.productFrom = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      Category: [null, Validators.required],
      productImage: [''],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(
      (result) => {
        this.categoreis = result;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to load categories',
        });
      },
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // FIX BUG: show selected file name inside input
      this.productFrom.patchValue({
        productImage: this.selectedFile.name,
      });
    }
  }

  onSubmit(): void {
    if (this.productFrom.invalid || !this.selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Data',
        text: 'Please complete all fields and choose image',
      });
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append(
      'imageFile',
      this.selectedFile,
      this.selectedFile.name,
    );

    this.productService.uploadImage(imageFormData).subscribe(
      (response: any) => {
        const imagePath = response.filePath;

        const formData = new FormData();

        formData.append('name', this.productFrom.get('name')?.value);
        formData.append(
          'description',
          this.productFrom.get('description')?.value,
        );
        formData.append('price', this.productFrom.get('price')?.value);
        formData.append(
          'stockQuantity',
          this.productFrom.get('stockQuantity')?.value,
        );
        formData.append('categoryId', this.productFrom.get('Category')?.value);
        formData.append('productImage', imagePath);

        this.productService.addNewProduct(formData).subscribe(
          () => {
            this.productFrom.reset();
            this.selectedFile = null;

            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Product added successfully',
              timer: 1800,
              showConfirmButton: false,
            });
          },
          (error) => {
            console.error('Error adding product:', error);

            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'Failed to add product',
            });
          },
        );
      },
      (error) => {
        console.error('Error uploading image:', error);

        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Image upload failed',
        });
      },
    );
  }
}
