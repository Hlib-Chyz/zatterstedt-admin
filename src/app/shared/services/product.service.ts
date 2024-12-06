import { inject, Injectable } from '@angular/core';
import { ProductHttpService } from '@shared/services/product-http.service';
import { Product } from '@shared/types/product.type';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private readonly productHttpService = inject(ProductHttpService);
    public products: Product[] = [];

    public getProducts(): Observable<Product[]> {
        return this.productHttpService.getAll().pipe(
            tap((products) => {
                this.products = products;
            })
        );
    }
}
