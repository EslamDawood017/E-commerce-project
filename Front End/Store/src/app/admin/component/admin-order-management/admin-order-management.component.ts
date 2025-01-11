import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Order } from '../../../Models/Order';
import { OrderService } from '../../services/Order/order.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-order-management',
  standalone: true,
  imports: [NgFor ,CommonModule , RouterLink],
  templateUrl: './admin-order-management.component.html',
  styleUrl: './admin-order-management.component.css'
})
export class AdminOrderManagementComponent implements OnInit {

  orders : Order[] = [] ;


  constructor(private ordersService : OrderService) {} 

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(){
    this.ordersService.getAllOrders().subscribe({
      next : (res) => {
        this.orders = res ;
      }, 
      error : (error) => {
        console.error("order Error" , error);
      }
    })
  }

  viewOrderDetails(orderId: number): void {
    // Navigate to order details page (optional implementation)
    console.log(`Viewing details for order ${orderId}`);
  }
  updateOrderStatus(orderId: number): void {}

  deleteOrder(orderId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this order!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersService.deleteOrder(orderId).subscribe({
          next : () => {
            Swal.fire('Deleted!', 'Order has been deleted.', 'success');
            this.loadOrders()},
          error : (error) => {
            console.error("Delete Order Error" , error);
          }
        });
      }
    });
  }



}
