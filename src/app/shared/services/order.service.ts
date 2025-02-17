import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewOrder, Order } from '@shared/types/order.types';
import { DefaultResponse } from '@shared/types/response.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'order';

    public getAll(): Observable<Order[]> {
        return this.http.get<Order[]>(this.controller);
    }

    public add(body: NewOrder): Observable<DefaultResponse> {
        return this.http.post<DefaultResponse>(this.controller, body);
    }
}
