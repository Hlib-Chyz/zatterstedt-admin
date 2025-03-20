import { inject, Injectable } from '@angular/core';
import { ProductHttpService } from '@shared/services/product-http.service';
import { DevelopmentCostProduct } from '@shared/types/development-cost.types';
import { JobManufacturingCostProduct } from '@shared/types/job.types';
import { Product } from '@shared/types/product.types';
import { formatDates } from '@shared/utilities/format-dates';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private readonly productHttpService = inject(ProductHttpService);
    public products: Product[] = [];

    public getProducts(): Observable<Product[]> {
        return this.productHttpService.getAll().pipe(
            tap((products) => {
                this.products = products
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((product) => ({
                        ...product,
                        developmentCosts: formatDates<DevelopmentCostProduct>(
                            product.developmentCosts
                        ),
                        manufacturingCost: {
                            ...product.manufacturingCost,
                            job: formatDates<JobManufacturingCostProduct>(
                                product.manufacturingCost.job
                            ),
                        },
                    }));
            })
        );
    }
}
