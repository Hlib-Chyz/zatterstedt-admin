import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EditableProduct, NewProduct, Product } from '@shared/types/product.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductHttpService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'product';

    public getAll(): Observable<Product[]> {
        return this.http.get<Product[]>(this.controller);
    }

    public add(product: NewProduct): Observable<unknown> {
        return this.http.post<unknown>(this.controller, product);
    }

    public update(product: EditableProduct): Observable<unknown> {
        return this.http.put<unknown>(this.controller, product);
    }

    public setPrice({
        productId,
        price,
    }: {
        productId: string;
        price: number;
    }): Observable<unknown> {
        return this.http.put<unknown>(`${this.controller}/price/${productId}`, {
            price,
        });
    }
}
