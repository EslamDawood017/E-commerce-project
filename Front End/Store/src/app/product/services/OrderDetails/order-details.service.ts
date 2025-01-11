import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environment/environment';
import { CreateOrderDetails } from '../../../Models/CreateOrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  

  constructor(private http : HttpClient) { }

  CreateOrderDetail(OrderDetailsList : CreateOrderDetails[]):Observable<boolean>{
    return this.http.post<boolean>(`${environment.LocalHostapiUrl}OrderDetails/Create` , OrderDetailsList);
  }
}
