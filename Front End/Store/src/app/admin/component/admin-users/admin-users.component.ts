import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../Models/UserInfo';
import { UserService } from '../../../shared/services/user-service.service';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgArrayPipesModule } from 'ngx-pipes';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [NgFor , FormsModule , NgArrayPipesModule , RouterLink],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {

  users: UserInfo[] = [];
  searchText : string = '';

  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers():void{
    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.users = data ;
      },
      error : (err) => {
        console.error('Error fetching users:', err);
        Swal.fire('Error', 'Failed to fetch users', 'error');
      }
    })
  }

  deleteUser(id:number):void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.userService.deleteUser(id).subscribe({
          next: (r) => {
            console.log(r);
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.loadUsers(); // Refresh the user list
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            Swal.fire('Error', 'Failed to delete user', 'error');
          }
        })
      }
    })
  }

}
