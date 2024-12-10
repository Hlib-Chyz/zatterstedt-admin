import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    private activeRequests = 0;
    public readonly loading = signal(false);

    public showLoader(): void {
        this.activeRequests++;
        this.updateLoadingState();
    }

    public hideLoader(): void {
        if (this.activeRequests > 0) {
            this.activeRequests--;
        }
        this.updateLoadingState();
    }

    private updateLoadingState(): void {
        this.loading.set(this.activeRequests > 0);
    }
}
