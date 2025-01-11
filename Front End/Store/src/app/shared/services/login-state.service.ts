import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {


  constructor(private userService : UserService) {
     
  }

  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  // Observable to track login status
  isLoggedIn$ = this.loggedIn.asObservable();

  // Method to check if user is logged in based on token presence
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Update login status when user logs in
  login(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  // Update login status when user logs out
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('UserId');
    this.loggedIn.next(false);
  }


}
