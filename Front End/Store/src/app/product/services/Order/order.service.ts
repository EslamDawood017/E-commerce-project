import { Injectable } from '@angular/core';
import { environment } from '../../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  localHost = environment.LocalHostapiUrl;
  constructor(private http : HttpClient) { }

  CreateOrder(userId : number , totalAmount : number):Observable<any>{
    return this.http.post<any>(`${this.localHost}Order/Create` , {
      "userId": userId,
      "totalAmount": totalAmount
    });
  }
}
