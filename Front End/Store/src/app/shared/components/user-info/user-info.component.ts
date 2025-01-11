import { Component, NgModule, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
  
  profileData : any  = {
    id : Number(localStorage.getItem('UserId')),
    userName : '' ,
    userEmail: '' ,
    password :''
  }


  constructor(private authService: AuthenticationService , private Router : Router) { }

  loadProfile(): void{
    let id = Number(localStorage.getItem('UserId'));
    this.authService.getProfile(id).subscribe({
      next : (res) => {
        this.profileData.userName = res.userName;
        this.profileData.userEmail= res.userEmail;
       
      } ,
      error : (err) => {
        console.error('Error fetching profile:', err);
      }
    })
  }
  ngOnInit(): void {
    this.loadProfile();
  }
  onUpdateProfile():void{
    this.authService.updateProfile(this.profileData).subscribe({
      next : (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Updated',
          text: 'Profile updated successfully!  ',
          confirmButtonText: 'OK'
        });
        
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update profile. Please try again.',
          footer: 'Contact support if the issue persists.',
        });}
      })
  }

}
