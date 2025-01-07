import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
    CanSaveInventoryResponse,
    InventoryManufacturingCostProduct,
} from '@shared/types/inventory.types';
import { JobManufacturingCostProduct } from '@shared/types/job.types';
import { DefaultResponse } from '@shared/types/response.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ManufacturingCostService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'manufacturing-costs';

    public setInventory({
        _id,
        inventory,
        oldInventory,
    }: {
        _id: string;
        inventory: InventoryManufacturingCostProduct[];
        oldInventory: InventoryManufacturingCostProduct[];
    }): Observable<DefaultResponse> {
        return this.http.put<DefaultResponse>(`${this.controller}/inventory/${_id}`, {
            inventory,
            oldInventory,
        });
    }

    public setJob({
        _id,
        job,
    }: {
        _id: string;
        job: JobManufacturingCostProduct[];
    }): Observable<DefaultResponse> {
        return this.http.put<DefaultResponse>(`${this.controller}/job-cost/${_id}`, { job });
    }

    public canSaveInventory(variantIds: string[]): Observable<CanSaveInventoryResponse> {
        return this.http.post<CanSaveInventoryResponse>(`${this.controller}/can-save-inventory`, {
            variantIds,
        });
    }
}
