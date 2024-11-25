import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Variant } from '@shared/types/variant.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VariantService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'variants';

    public getAll(): Observable<Variant[]> {
        return this.http.get<Variant[]>(this.controller);
    }
}
