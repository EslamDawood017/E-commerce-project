import { Component, EventEmitter, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../Models/Category';
import { Output } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [NgFor],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent implements OnInit{

  categories : Category[] = [] ;
  currentCategoryId : number = 0 ;

  @Output() categoryChange = new EventEmitter<number>();

  constructor(private categoryService : CategoryService) {
    
    
  }
  ngOnInit(): void {
    this.GetAllCategory();
  }
  GetAllCategory()
  {
    this.categoryService.getAllCategory().subscribe(
      result => {this.categories = result},
      error => {console.log("category error" + error)}
    );
  }
  onCategoryChange(event: Event) {
    const categoryId = +(event.target as HTMLInputElement).value;
    this.categoryChange.emit(categoryId);
  }
}
