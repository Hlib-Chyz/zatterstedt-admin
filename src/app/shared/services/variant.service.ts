import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CanSaveVariantsResponse, NewVariant, Variant } from '@shared/types/variant.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VariantService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'variants';

    public getAll(): Observable<Variant[]> {
        return this.http.get<Variant[]>(this.controller);
    }

    public setVariants(body: {
        productId: string;
        variants: NewVariant[];
        oldVariantIds: string[];
    }): Observable<Variant[]> {
        return this.http.post<Variant[]>(this.controller, body);
    }

    public canSaveVariants(variantIds: string[]): Observable<CanSaveVariantsResponse> {
        return this.http.post<CanSaveVariantsResponse>(`${this.controller}/can-save-variants`, {
            variantIds,
        });
    }
}
