import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/cards/card.service';
import { environment } from '../../../../Environment/environment';
import { FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import { OrderService } from '../../services/Order/order.service';
import { UserService } from '../../../shared/services/user-service.service';
import { OrderDetailsService } from '../../services/OrderDetails/order-details.service';
import { CreateOrderDetails } from '../../../Models/CreateOrderDetails';
import { NavigationExtras, Route, Router } from '@angular/router';
import { PaymentService } from '../../../shared/services/payment.service';
import { state } from '@angular/animations';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor , FormsModule , NgIf],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {


   host = environment.LocalHostapiUrl; 
   items: any[] = [];
   OrderId : number = 0 ;
   OrderDetailsList:CreateOrderDetails[] = [];
   

  constructor(private cartitem : CardService,
    private OrderService : OrderService,
    private UserService : UserService ,   
    private OrderDetails : OrderDetailsService , 
    private router : Router , 
    private paymentService : PaymentService 
  ) {
    this.items = this.cartitem.getCartItems()
  }
  ngOnInit(): void {
    this.paymentService.paymentSuccess$.subscribe({
      next : () => {
        this.ConfirmOrder();
        this.router.navigate(["/thankYou"] , {
          state : {
            orderId: this.OrderId,
            totalAmount: this.getTotalNumber(),
          }
        })
      }
    })
  }
 
  getTotalNumber():number{
    let total: number = 0 ;
    
    this.items.forEach(item => {total += item.product.price * item.quantity})

    return total ;
  }
  decreaseQuantity(index : number){
    if(this.items[index].quantity>0)
    {
      this.items[index].quantity -= 1;
      localStorage.setItem('cart' , JSON.stringify(this.items));
    }
    
  }
  increaseQuantity(index:number){
    this.items[index].quantity += 1;
    localStorage.setItem('cart' , JSON.stringify(this.items));
  }
  UpdateData(){
    localStorage.setItem('cart' , JSON.stringify(this.items));
  }
  deleteProduct(index:number){
    this.items.splice(index , 1);
    localStorage.setItem('cart' , JSON.stringify(this.items));
  }

  ConfirmOrder(){
    this.OrderService.CreateOrder( this.UserService.getUserId(),this.getTotalNumber()).subscribe(
      result=> {this.OrderId = result ;

        let Data = JSON.parse(localStorage.getItem('cart')!)

       

        Data.forEach( (element: { product: { price: number; id: number; }; quantity: number;})  => {    
          this.OrderDetailsList.push({orderId : this.OrderId ,
             price : element.product.price ,
              productId : element.product.id ,
              quantity : element.quantity})
        });

  

        this.OrderDetails.CreateOrderDetail(this.OrderDetailsList).subscribe(
          result => {
            if(result == true)
            {
              Swal.fire({
                icon: 'success',
                title: 'Order Added',
                text: 'your order is completed!',
                confirmButtonText: 'OK'
              });

              localStorage.removeItem('cart');
            

            }
          },
          error => console.log(error)
        )

        },
        error => {
        console.log(error)
      }
    )
  }

  ClearAllProduct(){
    Swal.fire({
      title: 'Warning?',
      text: "Are you sure that you want to clear your card!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Action to perform if confirmed
        Swal.fire(
          'Deleted!',
          'Your card has been cleared.',
          'success'
        );
      }
    });
    this.items.length = 0 ;
    localStorage.setItem('cart' , JSON.stringify(this.items));
  }

  onOrderNow(){
    const navigationExtras:NavigationExtras = {
      state:{
        amount : this.getTotalNumber()
      }
    }
    this.router.navigate(["/Payment"] , navigationExtras);

    
  }
}
