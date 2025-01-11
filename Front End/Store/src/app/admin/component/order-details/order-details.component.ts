import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Order } from '../../../Models/Order';
import { OrderDetail } from '../../../Models/OrderDetails';
import { OrderService } from '../../services/Order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NgFor , CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  order! : Order ;
  orderDetails : OrderDetail[] = [];

  constructor(private orderService : OrderService , 
    private router : Router , 
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));

    if(orderId){
      this.fetchOrderDetails(orderId);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No Order ID',
        text: 'Order ID is missing. Redirecting to orders.',
      }).then(() => this.router.navigate(['/Orders']));
    }
  }

  fetchOrderDetails(orderId:number){

    this.orderService.getOrderId(orderId).subscribe({
      next : (res) => { this.order = res},
      error : () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch order details. Redirecting to orders.',
        }).then(() => this.router.navigate(['/Orders']));
      } 
    });

    this.orderService.GetOrderDetails(orderId).subscribe({
      next : (res) => { this.orderDetails = res},
      error : () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch order details. Redirecting to orders.',
        }).then(() => this.router.navigate(['/Orders']));
      }
    })
  }

  goBack() {
    this.router.navigate(['/Orders']);
  }

}
