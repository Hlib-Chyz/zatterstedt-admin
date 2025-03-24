import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EditableDevelopmentCost, NewDevelopmentCost } from '@shared/types/development-cost.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DevelopmentCostService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'development-cost';

    public add(developmentCost: NewDevelopmentCost): Observable<unknown> {
        return this.http.post<unknown>(this.controller, developmentCost);
    }

    public update(developmentCost: EditableDevelopmentCost): Observable<unknown> {
        return this.http.put<unknown>(this.controller, developmentCost);
    }

    public delete(id: string): Observable<unknown> {
        return this.http.delete<unknown>(`${this.controller}/${id}`);
    }
}
