import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../Environment/environment';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent implements OnInit {
  orderId : number  = 0 ;
  totalAmount : number = 0 ;
  
  constructor(private router : Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { orderId: number; totalAmount: number };
    if (state) {
      this.orderId = state.orderId;
      this.totalAmount = state.totalAmount;
    }
  }

  goToHomePage(): void {
    this.router.navigate(['/']);
  }


}
