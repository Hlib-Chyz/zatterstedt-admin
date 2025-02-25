import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'stock';

    public setRealizedParty(body: {
        variantId: string;
        realizedParty: number;
    }): Observable<unknown> {
        return this.http.put<unknown>(`${this.controller}/realized-party`, body);
    }
}
