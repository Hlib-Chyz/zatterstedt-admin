import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { AuthService } from '@shared/services/auth.service';
import { Path } from '@shared/types/path.types';
import { delay, tap } from 'rxjs';

@Component({
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.scss',
    imports: [ReactiveFormsModule, TextControlComponent],
})
export default class LoginComponent implements AfterViewInit {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);
    public readonly loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });
    public readonly codeForm = this.fb.group({
        code: ['', Validators.required],
    });
    public isCodeSent = false;
    public codeInputRef = viewChild<ElementRef<HTMLInputElement>>('codeInput');
    public emailInputRef = viewChild<ElementRef<HTMLInputElement>>('emailInput');

    public ngAfterViewInit(): void {
        this.emailInputRef()?.nativeElement.focus();
    }

    public async onSubmitLogin(): Promise<void> {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.getRawValue();
            this.authService
                .login(email, password)
                .pipe(
                    tap(() => {
                        this.isCodeSent = true;
                    }),
                    delay(0)
                )
                .subscribe(() => {
                    this.codeInputRef()?.nativeElement.focus();
                });
        }
    }

    public onSubmitCode(): void {
        if (this.codeForm.valid) {
            const { email } = this.loginForm.getRawValue();
            const { code } = this.codeForm.getRawValue();
            this.authService.verifyCode(email, code).subscribe(() => {
                this.router.navigate(['/', Path.Home]);
            });
        }
    }
}
