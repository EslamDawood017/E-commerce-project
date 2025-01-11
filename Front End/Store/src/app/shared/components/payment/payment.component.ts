import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../services/strip.service';  
import { environment } from '../../../../Environment/environment';
import { CommonModule, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone : true ,
  imports:[CommonModule , NgIf] ,
  templateUrl: './payment.component.html',
  styleUrl :"./payment.component.css"
})
export class PaymentComponent implements OnInit {
  private stripe: any;
  private cardElement: any;
  successMessage: string = '';
  errorMessage: string = '';
  amount : number = 0 ; 

  constructor(private stripeService: StripeService , private router : Router , private paymentSuccess : PaymentService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { amount: number };
    this.amount = state?.amount || 0; // Default to 0 if not passed
  }

  ngOnInit(): void {
    this.stripe = this.stripeService.getStripeInstance();
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card', { hidePostalCode: true });
    this.cardElement.mount('#card-element');
  
    // Listen to changes in the card element
    this.cardElement.on('change', (event: any) => {
      const errorElement = document.getElementById('card-errors');
      if (event.error) {
        errorElement!.textContent = event.error.message;
      } else {
        errorElement!.textContent = '';
      }
    });
  }
  


  handlePayment() {
    this.stripe.createToken(this.cardElement).then((result: any) => {
      if (result.error) {
        // Show error using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Payment Error',
          text: result.error.message,
          confirmButtonText: 'Try Again',
        });
      } else {
        // Show a success message for token creation
        Swal.fire({
          icon: 'success',
          title: 'Token Created',
          text: 'Your payment token has been created successfully!',
          showConfirmButton: true,
         
        }).then(() => {
          // Proceed to call the backend for payment
          this.pay(result.token.id, this.amount);
        }).then(() => {
          this.paymentSuccess.notifyPaymentSuccess();
        });
      }
    });
  }
  
  pay(token : string , amount : number){
    
    this.stripeService.processPayment(token , amount).subscribe({
      next : (res) => {
        this.successMessage = 'Payment successful!' ;
        
        console.log('Payment Response:', res);
      }, 
      error : (error) => {
        this.errorMessage = 'Payment failed.';  
        console.error('Payment Error:', error);}
    });
  }
}
