import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FixedCost, NewFixedCost } from '@shared/types/fixed-cost.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FixedCostService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'fixed-cost';

    public getAll(): Observable<FixedCost[]> {
        return this.http.get<FixedCost[]>(this.controller);
    }

    public add(body: NewFixedCost): Observable<unknown> {
        return this.http.post<unknown>(this.controller, body);
    }

    public update(body: FixedCost): Observable<unknown> {
        return this.http.put<unknown>(this.controller, body);
    }

    public delete(id: string): Observable<unknown> {
        return this.http.delete<unknown>(`${this.controller}/${id}`);
    }
}
