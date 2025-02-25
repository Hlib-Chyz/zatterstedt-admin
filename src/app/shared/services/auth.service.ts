import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@shared/types/path.types';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly controller = 'auth';
    private readonly TOKEN_KEY = 'jwtToken';

    public getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    public saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    public removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    public login(email: string, password: string): Observable<{ success: boolean; token: string }> {
        return this.http
            .post<{ success: boolean; token: string }>(`${this.controller}/login`, {
                email,
                password,
            })
            .pipe(
                tap(({ token }) => {
                    this.saveToken(token);
                })
            );
    }

    public verifyCode(email: string, code: string): Observable<unknown> {
        return this.http.post<unknown>(`${this.controller}/verify-code`, {
            email,
            code,
        });
    }

    public logout(): void {
        this.removeToken();
        this.router.navigate(['/', Path.Login]);
    }
}
