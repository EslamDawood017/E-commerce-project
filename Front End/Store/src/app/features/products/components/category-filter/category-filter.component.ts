import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import { Category } from '../../../../shared/models/Category';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css',
})
export class CategoryFilterComponent implements OnInit, OnChanges {
  categories: Category[] = [];
  @Input() selectedCategoryId = 0;

  @Output() categoryChange = new EventEmitter<number>();
  @Output() categoryMetaChange = new EventEmitter<{
    id: number;
    label: string;
  }>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategoryId']) {
      this.emitCategoryMeta(this.selectedCategoryId);
    }
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(
      (result) => {
        this.categories = result;
        this.emitCategoryMeta(this.selectedCategoryId);
      },
      (error) => {},
    );
  }

  onCategoryChange(categoryId: number) {
    this.selectedCategoryId = Number(categoryId);
    this.categoryChange.emit(categoryId);
    this.emitCategoryMeta(categoryId);
  }

  private emitCategoryMeta(categoryId: number): void {
    if (categoryId === 0) {
      this.categoryMetaChange.emit({ id: 0, label: 'All categories' });
      return;
    }

    const match = this.categories.find(
      (item) => item.categoryId === categoryId,
    );
    this.categoryMetaChange.emit({
      id: categoryId,
      label: match?.categoryName ?? 'Selected category',
    });
  }
}
