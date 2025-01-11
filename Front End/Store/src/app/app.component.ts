import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { TopHeaderComponent } from "./shared/components/top-header/top-header.component";
import { SubheaderComponent } from "./shared/components/subheader/subheader.component";
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet, HeaderComponent, TopHeaderComponent, TopHeaderComponent, SubheaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[SharedService]
})
export class AppComponent {
  title = 'Store';
  CurrentCategoryID : number = 0 ;

  constructor(sherdService : SharedService) {
    
  }
}
