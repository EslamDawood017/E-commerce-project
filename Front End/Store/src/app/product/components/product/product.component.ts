import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../Models/Product';
import { environment} from '../../../../Environment/environment'
import { Router, RouterLink } from '@angular/router';
import {  NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { UserService } from '../../../shared/services/user-service.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink , NgIf , FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(private auth:AuthenticationService , 
    private router :Router,
    private UserInfo : UserService){}

  environment : string = environment.LocalHostapiUrl;
  @Input() data! : Product ;
  @Output() item = new EventEmitter()
  showProductqauntity : boolean = false;
  Amount :number = 0 ;

  add()
  {
    if(this.auth.isLogedIn())
    {
      const userId = this.UserInfo.getUserId();
      
      this.item.emit({
        product:this.data ,
        quantity : this.Amount,
        userId
      });
    }
    else
    {
      this.router.navigateByUrl('/login');
    }
  }
}
