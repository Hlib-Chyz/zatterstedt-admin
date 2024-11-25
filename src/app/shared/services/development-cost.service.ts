import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewDevelopmentCost } from '@shared/types/development-cost.types';
import { DefaultResponse } from '@shared/types/response.type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DevelopmentCostService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'development-costs';

    public add(developmentCost: NewDevelopmentCost): Observable<DefaultResponse> {
        return this.http.post<DefaultResponse>(this.controller, developmentCost);
    }
}
