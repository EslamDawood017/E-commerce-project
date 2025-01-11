import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginStateService } from '../../services/login-state.service';
import { async } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink , CommonModule , RouterLinkActive ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent { 

  isLoggedIn$ ;

  constructor(private authService: LoginStateService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  // Call logout method from AuthService
  logout() {
    this.authService.logout();
  }

  
  

}
