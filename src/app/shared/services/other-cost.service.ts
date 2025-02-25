import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewOtherCost, OtherCost } from '@shared/types/other-cost.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OtherCostService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'other-cost';

    public getAll(): Observable<OtherCost[]> {
        return this.http.get<OtherCost[]>(this.controller);
    }

    public add(body: NewOtherCost): Observable<unknown> {
        return this.http.post<unknown>(this.controller, body);
    }

    public update(body: OtherCost): Observable<unknown> {
        return this.http.put<unknown>(this.controller, body);
    }

    public delete(id: string): Observable<unknown> {
        return this.http.delete<unknown>(`${this.controller}/${id}`);
    }
}
