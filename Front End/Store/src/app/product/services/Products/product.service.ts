import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../Models/Product';
import { environment } from '../../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  getAllProduct():Observable<Product[]>{
    return this.http.get<Product[]>( environment.LocalHostapiUrl + "Product");
  }

  getProductById(id : number):Observable<Product>{
    return this.http.get<Product>(`${environment.LocalHostapiUrl}Product/Id?Id=${id}`);
  }

  addNewProduct(product :FormData):Observable<any>{
    return this.http.post<any>(`${environment.LocalHostapiUrl}Product/create`, product);
  }
  UpdateProduct(id:number , product : Product):Observable<any>{
    return this.http.put<any>(`${environment.LocalHostapiUrl}Product/${id}` , product);
  }
  deleteProduct(id:number):Observable<any>{
    return this.http.delete(`${environment.LocalHostapiUrl}Product/${id}`);
  }

  uploadImage(imageData : FormData):Observable<any>{
    return this.http.post<any>(environment.LocalHostapiUrl + "ImageUpload/Upload" , imageData);
  }

  getProductByCategoryId(categoryId : number):Observable<Product[]>{
    return this.http.get<Product[]>(environment.LocalHostapiUrl + "Product/categoryId?CategoryId=" + categoryId);
  }
}
