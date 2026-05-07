import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { passwordComplexityValidator } from '../../../../Environment/helpers/helper';
import { NgFor, NgIf } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  submitError = '';

  roles = ['Customer', 'Admin'];

  isUserExist = false;
  isEmailExist = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            passwordComplexityValidator(),
          ],
        ],
        role: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        address: ['', [Validators.required]],
      },
      { Validators: this.passwordMatchValidator },
    );
  }

  onSubmit() {
    this.submitError = '';
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.authService
      .isUserNameExist(this.registerForm.get('username')?.value)
      .subscribe((result) => {
        this.isUserExist = result;
      });

    this.authService
      .isEmailExist(this.registerForm.get('email')?.value)
      .subscribe((result) => {
        this.isEmailExist = result;
      });

    this.authService
      .register(this.registerForm.value)
      .subscribe(
        (response) => {
          const role = this.registerForm.get('role')?.value;

          if (role === 'Customer') {
            this.authService
              .getUserInfoByUserName(this.registerForm.get('username')?.value)
              .subscribe((userInfo) => {
                this.shoppingCartService
                  .createShoppingCart(userInfo.id)
                  .subscribe();
              });
          }

          this.registerForm.reset();

          Swal.fire({
            icon: 'success',
            title: 'User added successfully',
            text: 'The new user has been created.',
            confirmButtonText: 'Go to User Management',
          }).then(() => {
            this.router.navigateByUrl('/admin/users');
          });
        },
        (error) => {
          this.submitError =
            'Unable to create account. Please try again later.';
        },
      )
      .add(() => {
        this.isSubmitting = false;
      });
  }

  public passwordMatchValidator(
    form: AbstractControl,
  ): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
