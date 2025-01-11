import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cartItems :any[] = [];
  constructor() { }

  getCartItems():any{
    return this.cartItems =JSON.parse(localStorage.getItem('cart')!);
  }
}
 