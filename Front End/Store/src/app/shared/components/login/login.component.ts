import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm : FormGroup
  loginError :string | null = null ;

  constructor(private fb:FormBuilder,
    private auth : AuthenticationService ,
    private router : Router ,
    private UserService : UserService){
    this.loginForm = fb.group({
      username : ['' , Validators.required],  
      password:['' , Validators.required]
    }); 
  }

  onSubmit()
  {
    this.auth.Login(this.loginForm.value).subscribe(
      result => {
        localStorage.setItem('token' , result.token);
        this.auth.getUserInfoByUserName(this.loginForm.get('username')?.value).subscribe( userInfo => {
          console.log(userInfo);
          localStorage.setItem("UserId" , JSON.stringify(userInfo.id));
          window.location.reload() ;  
        }) ;
        this.router.navigate(['/Products']); 
         
      },
      error => {
        console.log(error);
        this.loginError = "Invalid username or password";
      }
    )
  }



}
