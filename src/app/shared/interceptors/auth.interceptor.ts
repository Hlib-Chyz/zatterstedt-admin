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
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const loaderService = inject(LoaderService);
    const toastrService = inject(ToastrService);
    loaderService.showLoader();
    const baseUrl =
        window.location.protocol === 'https:' ? environment.apiUrl : 'http://localhost:3000';
    const url = `${baseUrl}/${req.url}`;
    const token = authService.getToken();
    const modifiedReq = req.clone({
        url,
        setHeaders: token
            ? {
                  Authorization: `Bearer ${token}`,
                  'x-vercel-protection-bypass': 'p66S5p5geDL15ANbUQnnUgng7c0vGwf7',
              }
            : { 'x-vercel-protection-bypass': 'p66S5p5geDL15ANbUQnnUgng7c0vGwf7' },
    });

    return next(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log(error);
            toastrService.error(error.error.message);
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
