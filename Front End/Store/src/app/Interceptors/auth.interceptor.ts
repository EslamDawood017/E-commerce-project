import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Retrieve token from local storage
  const token = localStorage.getItem('token');

  // If token exists, clone the request and add the Authorization header
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  console.log(authReq);
  return next(authReq);
};
