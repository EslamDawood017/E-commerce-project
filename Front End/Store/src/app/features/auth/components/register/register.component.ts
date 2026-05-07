import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { passwordComplexityValidator } from '../../../../../Environment/helpers/helper';
import { NgIf } from '@angular/common';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart/shopping-cart.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-for-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isUserExist = false;
  isEmailExist = false;
  isSubmitting = false;
  submitError = '';

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
        role: ['Customer', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        address: ['', [Validators.required]],
      },
      { Validators: this.passwordMatchValidator },
    );
  }

  onSubmit() {
    if (this.registerForm.invalid || this.isSubmitting) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

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

    this.authService.register(this.registerForm.value).subscribe(
      () => {
        this.registerForm.reset();
        this.isSubmitting = false;

        Swal.fire({
          icon: 'success',
          title: 'Registration successful',
          text: 'Your account has been created. Please login to continue.',
          confirmButtonText: 'Go to Login',
        }).then(() => {
          this.router.navigateByUrl('/login');
        });
      },
      (error) => {
        this.isSubmitting = false;
        this.submitError = 'Unable to create your account. Please try again.';
        console.error('Error in Register', error);
      },
    );
  }

  public passwordMatchValidator(
    form: AbstractControl,
  ): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
