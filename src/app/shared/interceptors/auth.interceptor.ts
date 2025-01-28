/* eslint-disable no-console */
import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { LoaderService } from '@shared/services/loader.service';
import { catchError, finalize, throwError } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const loaderService = inject(LoaderService);
    loaderService.showLoader();
    const baseUrl =
        window.location.protocol === 'https:'
            ? 'https://zatterstedt-server.vercel.app'
            : 'http://localhost:3000';
    const url = `${baseUrl}/${req.url}`;
    const token = authService.getToken();
    const modifiedReq = req.clone({
        url,
        setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return next(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 401) {
                authService.logout();
            } else if (error.status === 0) {
                console.error('A network or CORS issue occurred:', error);
            }
            return throwError(() => error);
        }),
        finalize(() => {
            loaderService.hideLoader();
        })
    );
};
