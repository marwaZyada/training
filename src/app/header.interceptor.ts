import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
 let token= localStorage.getItem('token') || ''
  let clonedreq = req.clone({
    headers:req.headers.set('Authorization', `Bearer ${token}`),
  })
    
  return next(clonedreq);
};
