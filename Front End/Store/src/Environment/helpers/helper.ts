import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordComplexityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = password.length >= 6;

    const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && minLength;

    return !isValid
      ? {
          passwordComplexity: {
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            hasSpecialChar,
            minLength,
          },
        }
      : null;
  };
}
