import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spiner',
  standalone: true,
  imports: [],
  templateUrl: './spiner.component.html',
  styleUrl: './spiner.component.css'
})
export class SpinerComponent {
  @Input() isLoading: boolean = false; 
}
