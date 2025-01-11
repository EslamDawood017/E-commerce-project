import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentSuccessSubject  = new Subject<void>();
  paymentSuccess$ = this.paymentSuccessSubject.asObservable();

  constructor() { }

  notifyPaymentSuccess() {
    this.paymentSuccessSubject.next();
  }
}
