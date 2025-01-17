export interface RegisterUser {
    userName: string;
    password: string;
    confirmPassword: string;
    email: string;
    address: string;
    role: 'admin' | 'customer';
  }