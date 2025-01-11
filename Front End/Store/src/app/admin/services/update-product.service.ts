import { Injectable } from '@angular/core';
import { Product } from '../../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {

  private product!: Product;

  setProduct(product: Product): void {
    this.product = product;
  }

  getProduct(): Product {
    return this.product;
  }
}
