import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.css'
})
export class AccessDeniedComponent {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/']); // Redirect to homepage
  }

  contactSupport(): void {
    alert('Please contact support at support@example.com.');
  }
}
