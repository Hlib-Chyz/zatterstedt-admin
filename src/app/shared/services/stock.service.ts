import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DefaultResponse } from '@shared/types/response.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'stock';

    public setRealizedParty(body: {
        variantId: string;
        realizedParty: number;
    }): Observable<DefaultResponse> {
        return this.http.put<DefaultResponse>(`${this.controller}/realized-party`, body);
    }
}
