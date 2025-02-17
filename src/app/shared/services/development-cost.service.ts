import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EditableDevelopmentCost, NewDevelopmentCost } from '@shared/types/development-cost.types';
import { DefaultResponse } from '@shared/types/response.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DevelopmentCostService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'development-cost';

    public add(developmentCost: NewDevelopmentCost): Observable<DefaultResponse> {
        return this.http.post<DefaultResponse>(this.controller, developmentCost);
    }

    public update(developmentCost: EditableDevelopmentCost): Observable<DefaultResponse> {
        return this.http.put<DefaultResponse>(this.controller, developmentCost);
    }

    public delete(id: string): Observable<DefaultResponse> {
        return this.http.delete<DefaultResponse>(`${this.controller}/${id}`);
    }
}
