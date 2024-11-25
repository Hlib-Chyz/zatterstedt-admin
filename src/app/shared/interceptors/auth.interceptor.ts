/* eslint-disable no-console */
import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const url = `http://localhost:3000/${req.url}`;
    const modifiedReq = req.clone({ withCredentials: true, url });
    return next(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 401) {
                authService.logout();
            } else if (error.status === 0) {
                console.error('A network or CORS issue occurred:', error);
            }
            return throwError(() => error);
        })
    );
};
