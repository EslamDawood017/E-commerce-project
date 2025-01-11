import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  ProductCount():Observable<any> {
    return this.http.get(`${environment.LocalHostapiUrl}Product/Count`);
  }
  ordersCount():Observable<any> {
    return this.http.get(`${environment.LocalHostapiUrl}Order/Count`);
  }
  usersCount():Observable<any> {
    return this.http.get(`${environment.LocalHostapiUrl}Count`);
  }
}
