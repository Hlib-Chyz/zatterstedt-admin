import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FixedCost, NewFixedCost } from '@shared/types/fixed-cost.types';
import { DefaultResponse } from '@shared/types/response.type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FixedCostService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'fixed-costs';

    public getAll(): Observable<FixedCost[]> {
        return this.http.get<FixedCost[]>(this.controller);
    }

    public add(body: NewFixedCost): Observable<DefaultResponse> {
        return this.http.post<DefaultResponse>(this.controller, body);
    }

    public update(body: FixedCost): Observable<DefaultResponse> {
        return this.http.patch<DefaultResponse>(this.controller, body);
    }

    public delete(id: string): Observable<DefaultResponse> {
        return this.http.delete<DefaultResponse>(`${this.controller}/${id}`);
    }
}
