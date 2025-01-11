import { Injectable } from '@angular/core';
import { environment } from '../../../Environment/environment'; 
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';

declare var Stripe: any; // Declare the global Stripe object

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripe: any;
  
  constructor(private http : HttpClient) {
    this.stripe = Stripe(environment.stripePublicKey); 
  }

  getStripeInstance() {
    return this.stripe;
  }

  processPayment(token : string , amount : number){
    return this.http.post(`${environment.LocalHostapiUrl}Payment` , {
      token: token , 
      amount : amount 
    })
  }


}
