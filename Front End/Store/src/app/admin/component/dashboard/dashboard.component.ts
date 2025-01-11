import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  totalProducts : number = 0 ;
  totalUsers: number = 0;
  totalOrders: number = 0;


  constructor(private dashboardService : DashboardService) {
  }

  ngOnInit(): void {
    this.fetchCount();
  }

  fetchCount(){

    this.dashboardService.ProductCount().subscribe({
      next : (res) => {this.totalProducts = res},
      error : (error) => {console.error('Failed to fetch products count', error)}
    });

    this.dashboardService.ordersCount().subscribe({
      next : (res) => {this.totalOrders = res},
      error : (error) => {console.error('Failed to fetch orders count', error)}
    });

    this.dashboardService.usersCount().subscribe({
      next : (res) => {this.totalUsers = res},
      error : (error) => {console.error('Failed to fetch users count', error)}
    });
  }
}
