import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AdditionalCost } from '@shared/types/additional-cost.types';
import { Observable } from 'rxjs';
import { DefaultResponse } from '@shared/types/response.types';

@Injectable({ providedIn: 'root' })
export class AdditionalCostService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'additional-cost';

    public update(additionalCost: AdditionalCost): Observable<DefaultResponse> {
        return this.http.put<DefaultResponse>(this.controller, additionalCost);
    }
}
