import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Models/Product';
import { ProductService } from '../../../product/services/Products/product.service';
import Swal from 'sweetalert2';
import { environment } from '../../../../Environment/environment';
import { UpdateProductService } from '../../services/update-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [NgFor , CommonModule],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent implements OnInit {

  products: Product[] = [];
  domain = environment.LocalHostapiUrl;


  constructor(private productService : ProductService ,
     private UpdateProductService : UpdateProductService,
    private router : Router) {
    
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void{
    this.productService.getAllProduct().subscribe({
      next: (res) => {this.products = res}, 
      error: (error) => {console.error('Failed to load products:', error)}
    })
  }
  updateProduct(product: any): void {
    this.UpdateProductService.setProduct(product);
    this.router.navigate(['/updateProduct']);
  }
  deleteProduct(productId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The product has been deleted.', 'success');
            this.loadProducts(); // Refresh product list
          },
          error: (err) => {
            console.error('Failed to delete product:', err);
            Swal.fire('Error', 'Failed to delete product.', 'error');
          },
        });
      }
    });
  }

}
