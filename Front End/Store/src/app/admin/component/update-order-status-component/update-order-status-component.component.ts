import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Order } from '../../../Models/Order';
import { OrderService } from '../../services/Order/order.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-update-order-status-component',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterLink],
  templateUrl: './update-order-status-component.component.html',
  styleUrl: './update-order-status-component.component.css'
})
export class UpdateOrderStatusComponentComponent implements OnInit {

  order! : Order  ;
  selectedStatus : number  = 1 ;
  statuses = [
    { id: 1, label: 'Pending' },
    { id: 2, label: 'Shipped' },
    { id: 3, label: 'Delivered' },
    { id: 4, label: 'Cancelled' },
    { id: 5, label: 'Returned' },
  ];


  constructor(private orderService : OrderService , 
    private route : ActivatedRoute , 
    private router : Router) {}

  ngOnInit(): void {
    const state = history.state;
    this.order = state?.order;

    if (!this.order) {
      Swal.fire({
        icon: 'error',
        title: 'No Order Data',
        text: 'No order information available. Returning to order management.',
      }).then(() => this.router.navigate(['/Orders']));
    } else {
      this.selectedStatus = this.statuses.find(p => p.label == this.order.status)!.id;
    }
  }

  getStatusLabel(statusId: number): string {
    const status = this.statuses.find((s) => s.id === statusId);
    return status ? status.label : 'Unknown';
  }

  updateStatus() {
    this.orderService.UpdateStatus(this.order.orderId , this.selectedStatus)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Status Updated',
            text: `Order status updated to ${this.getStatusLabel(this.selectedStatus)}.`,
          }).then(() => this.router.navigate(['/Orders']));
        },
        error: (err) => {
          console.error('Error updating status:', err);
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Failed to update order status. Please try again.',
          });
        },
      });
  }

  cancel() {
    this.router.navigate(['/Orders']);
  }


}
