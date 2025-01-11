import { NgIf } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [RouterLink , NgIf],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.css'
})
export class SubheaderComponent implements OnInit , OnChanges {
  
  isUserLoggedIn : boolean = false;
  userRole : string = '';

  constructor(private userService : UserService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.userService.getLoggedInUserAsOsObservable().subscribe({
      next : (user) => {
        this.isUserLoggedIn = true;
        this.userRole = user.role ;
      }, 
      error : (error) => {
        console.error("No Logged in user" , error);
      }
    })
  }

  ngOnInit(): void {
    
    this.userService.getLoggedInUserAsOsObservable().subscribe({
      next : (user) => {
        this.isUserLoggedIn = true;
        this.userRole = user.role ;
      }, 
      error : (error) => {
        console.error("No Logged in user" , error);
      }
    })
  }
}
