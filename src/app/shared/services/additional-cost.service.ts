import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AdditionalCost } from '@shared/types/additional-cost.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdditionalCostService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'additional-cost';

    public update(additionalCost: AdditionalCost): Observable<unknown> {
        return this.http.put<unknown>(this.controller, additionalCost);
    }
}
