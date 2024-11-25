import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DefaultResponse } from '@shared/types/response.type';
import { Observable } from 'rxjs';
import { NewOrder, Order } from '../types/order.types';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'orders';

    public getAll(): Observable<Order[]> {
        return this.http.get<Order[]>(this.controller);
    }

    public add(body: NewOrder): Observable<DefaultResponse> {
        return this.http.post<DefaultResponse>(this.controller, body);
    }
}
