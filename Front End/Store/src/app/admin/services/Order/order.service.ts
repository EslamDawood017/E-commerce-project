import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../Models/Order';
import { environment } from '../../../../Environment/environment';
import { OrderDetail } from '../../../Models/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  getAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${environment.LocalHostapiUrl}Order/All`);
  }
  deleteOrder(OrderId : number):Observable<void>{
    return this.http.delete<void>(`${environment.LocalHostapiUrl}Order/${OrderId}`);
  }
  UpdateStatus( OrderId: number , statusId : number):Observable<void>{
    return this.http.put<void>(`${environment.LocalHostapiUrl}Order/${OrderId}?StatusId=${statusId}` ,null);
  }
  GetOrderDetails(orderId : number):Observable<OrderDetail[]>{
    return this.http.get<OrderDetail[]>(`${environment.LocalHostapiUrl}OrderDetails?OrderId=${orderId}`);
  }
  getOrderId(orderId : number) : Observable<Order>{
    return this.http.get<Order>(`${environment.LocalHostapiUrl}Order/${orderId}`);
  }
}
