import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getAllCategory():Observable<Category[]>
  {
    return this.http.get<Category[]>('http://localhost:5295/Category/GetAll');
  }
}
