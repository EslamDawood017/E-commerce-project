import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../shared/models/UserInfo';
import { UserService } from '../../../shared/services/user-service.service';
import Swal from 'sweetalert2';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink, NgClass, NgIf],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent implements OnInit {
  users: UserInfo[] = [];
  searchText: string = '';
  selectedRole = 'all';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        Swal.fire('Error', 'Failed to fetch users', 'error');
      },
    });
  }

  get filteredUsers(): UserInfo[] {
    const search = this.searchText.trim().toLowerCase();
    return this.users.filter((user) => {
      const matchesSearch =
        !search ||
        user.userName.toLowerCase().includes(search) ||
        user.userEmail.toLowerCase().includes(search);
      const matchesRole =
        this.selectedRole === 'all' ||
        user.role.toLowerCase() === this.selectedRole.toLowerCase();
      return matchesSearch && matchesRole;
    });
  }

  get adminCount(): number {
    return this.users.filter((user) => user.role === 'Admin').length;
  }

  get customerCount(): number {
    return this.users.filter((user) => user.role !== 'Admin').length;
  }

  deleteUser(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: (r) => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.loadUsers(); // Refresh the user list
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            Swal.fire('Error', 'Failed to delete user', 'error');
          },
        });
      }
    });
  }
}
