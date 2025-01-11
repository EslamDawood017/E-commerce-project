import { Injectable } from '@angular/core';
import { environment } from '../../../../Environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {


  constructor(private http : HttpClient) { }

  CreateShoppingCard(UserId : number):Observable<any>{
    return this.http.post<any>(`${environment.LocalHostapiUrl}shoppingCart?UserID=${UserId}` , '');
  }
}
