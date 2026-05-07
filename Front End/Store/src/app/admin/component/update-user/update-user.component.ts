import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../../shared/services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    // Populate the form with the data passed via the route
    const userData = this.route.snapshot.queryParams;

    this.userForm.patchValue(userData);
  }

  onSubmit(): void {
    if (this.userForm.invalid || this.isSubmitting) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const UpdatedUser = this.userForm.getRawValue();
    this.userService.updateUser(UpdatedUser).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire('Success', 'User updated successfully', 'success').then(
          () => {
            this.router.navigate(['/admin/users']);
          },
        );
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('User not updated', error);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/users']); // Navigate back to user list
  }

  hasControlError(controlName: string, errorKey: string): boolean {
    const control = this.userForm.get(controlName);
    return !!control && control.touched && control.hasError(errorKey);
  }
}
