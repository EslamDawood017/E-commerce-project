import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/Products/product.service';
import { Product} from '../../../Models/Product'
import { NgFor, NgIf } from '@angular/common';
import { CategoryFilterComponent } from "../category-filter/category-filter.component";
import { SpinerComponent } from "../../../shared/components/spiner/spiner.component";
import { SubheaderComponent } from "../../../shared/components/subheader/subheader.component";
import { ProductComponent } from "../product/product.component";
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { query } from '@angular/animations';



@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [NgFor,FormsModule, ProductComponent, CategoryFilterComponent, SpinerComponent, SpinerComponent, NgIf, SubheaderComponent, ProductComponent],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css'
})
export class AllProductComponent implements OnInit {

  products:Product[] = [];
  FilteredProduct :Product[] = [];
  CardProduts:any[] = [];
  spiner:boolean = true;
  searchQuery:string = '';

  constructor(private ProductService : ProductService  ) {
    
  }

  ngOnInit(): void {
    this.spiner = true ;
    this.getAllProduct(); 
  }
  getAllProduct()
  {
    this.spiner = true ;
    this.ProductService.getAllProduct().subscribe(
      (result:Product[]) => {
        this.spiner = false ;
        this.products = result;
        this.FilteredProduct = result;
      } ,
      (error) => {
        this.spiner = false ;
        console.error('Error fetching product data:', error);
      }
    )
  }

  filterProducts():void{
    const query = this.searchQuery.trim().toLocaleLowerCase();

    if(query){
      this.FilteredProduct = this.products.filter((p)=> p.name.toLocaleLowerCase().includes(query));
    }
    else{
      this.FilteredProduct = [...this.products];
    }

  }

  onCategoryChange(categoryId :number)
  {
    this.spiner = true
    this.ProductService.getProductByCategoryId(categoryId).subscribe(
      result => 
      {
        this.spiner = false ;
        categoryId == 0 ? this.getAllProduct() :this.FilteredProduct = result;
      },
      error => console.log( "get product by category error:" + error.value)
    )
  }
  addToCard(event:any){
    if("cart" in localStorage){
      
      this.CardProduts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.CardProduts.find(item => item.product.id == event.product.id);

      if(exist){
        Swal.fire({
        icon: 'info',
        title: 'Item Already Added',
        text: 'This item is already in your cart!',
        confirmButtonText: 'OK'
      })
        return ;
      }
      else{
        this.AddProductToLocalStorage(event);
      }
      
    }
    else{
      this.AddProductToLocalStorage(event);
    }  
  }
  private AddProductToLocalStorage(product : any){
    this.CardProduts.push(product);
    localStorage.setItem("cart" , JSON.stringify(this.CardProduts));
    Swal.fire({
      icon: 'success',
      title: 'Item Added',
      text: 'This item has been added to your cart!',
      confirmButtonText: 'OK'
    });
  }
  

}
