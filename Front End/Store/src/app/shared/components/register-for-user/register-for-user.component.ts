import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { passwordComplexityValidator } from '../../../../Environment/helpers/helper';
import { NgFor, NgIf } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user-service.service';
import { ShoppingCardService } from '../../../product/services/ShoppingCard/shopping-card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-for-user',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf , NgFor],
  templateUrl: './register-for-user.component.html',
  styleUrl: './register-for-user.component.css'
})
export class RegisterForUserComponent {
  registerForm : FormGroup;

  roles = ["Customer" , "Admin"]

  isUserExist = false;
  isEmailExist = false;

  constructor(private fb:FormBuilder ,
    private authService : AuthenticationService,
    private UserService : UserService, 
    private ShoppingCartService : ShoppingCardService , 
    private Router : Router
    ) {
    this.registerForm = this.fb.group({
      username : ['' ,[Validators.required]],
      email : ['' , [Validators.required , Validators.email]],
      password : ['' , [Validators.required , Validators.minLength(6) , passwordComplexityValidator()]],
      role:['Customer' , [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      address: ['', [Validators.required]],
    },{Validators : this.passwordMatchValidator});
    
  }

  OnSubmit(){
    if(this.registerForm.valid)
    {
      this.authService.isUserNameExist(this.registerForm.get("username")?.value).subscribe(
        result => {this.isUserExist = result},
        error =>{console.log(error)} 
      )

      this.authService.isEmailExist(this.registerForm.get("email")?.value).subscribe(
        result => {this.isEmailExist = result;
          console.log(result);
        },
        error =>{console.log(error)} 
      )

      this.authService.register(this.registerForm.value).subscribe(

        Response => {console.log('User registered successfuly' , Response);

          localStorage.setItem("token" , Response.token);

          this.authService.getUserInfoByUserName(this.registerForm.get('username')?.value).subscribe( userInfo => {
            this.ShoppingCartService.CreateShoppingCard(userInfo.id).subscribe();
            localStorage.setItem("UserId" , JSON.stringify(userInfo.id));
          }) 

          
          this.registerForm.reset();
          this.Router.navigateByUrl('/Products');
          window.location.reload();
        },
        error => {console.log('Error in Register'  , error)}
      )
    }

  }

  public passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


}
