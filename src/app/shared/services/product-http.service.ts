import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EditableProduct, NewProduct, Product } from '@shared/types/product.types';
import { DefaultResponse } from '@shared/types/response.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductHttpService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'product';

    public getAll(): Observable<Product[]> {
        return this.http.get<Product[]>(this.controller);
    }

    public add(product: NewProduct): Observable<DefaultResponse> {
        return this.http.post<DefaultResponse>(this.controller, product);
    }

    public update(product: EditableProduct): Observable<DefaultResponse> {
        return this.http.put<DefaultResponse>(this.controller, product);
    }

    public setPrice({
        productId,
        price,
    }: {
        productId: string;
        price: number;
    }): Observable<DefaultResponse> {
        return this.http.put<DefaultResponse>(`${this.controller}/price/${productId}`, {
            price,
        });
    }
}
