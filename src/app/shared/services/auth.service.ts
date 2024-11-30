import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@shared/types/path.types';
import { DefaultResponse } from '@shared/types/response.type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly controller = 'auth';

    public login(email: string, password: string): Observable<DefaultResponse> {
        return this.http.post<DefaultResponse>(`${this.controller}/login`, {
            email,
            password,
        });
    }

    public verifyCode(email: string, code: string): Observable<DefaultResponse> {
        return this.http.post<DefaultResponse>(
            `${this.controller}/verify-code`,
            {
                email,
                code,
            },
            { withCredentials: true }
        );
    }

    public logout(): void {
        document.cookie = 'jwt=; Max-Age=0';
        this.router.navigate([Path.Login]);
    }
}
