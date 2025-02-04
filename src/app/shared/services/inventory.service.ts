import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { InventoryHttpService } from '@shared/services/inventory-http.service';
import { BehaviorSubject, map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
    private readonly inventoryHttpService = inject(InventoryHttpService);
    public refresh$ = new BehaviorSubject<void>(void 0);
    public inventory = toSignal(
        this.refresh$.pipe(
            switchMap(() => this.inventoryHttpService.getAll()),
            map((inv) => inv.sort((a, b) => a.name.localeCompare(b.name)))
        )
    );
}
