import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EditableOtherCost, NewOtherCost, OtherCost } from '@shared/types/other-cost.types';
import { DefaultResponse } from '@shared/types/response.type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OtherCostService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'other-costs';

    public getAll(): Observable<OtherCost[]> {
        return this.http.get<OtherCost[]>(this.controller);
    }

    public add(body: NewOtherCost): Observable<DefaultResponse> {
        return this.http.post<DefaultResponse>(this.controller, body);
    }

    public update(body: EditableOtherCost): Observable<DefaultResponse> {
        return this.http.patch<DefaultResponse>(this.controller, body);
    }

    public delete(id: string): Observable<DefaultResponse> {
        return this.http.delete<DefaultResponse>(`${this.controller}/${id}`);
    }
}
