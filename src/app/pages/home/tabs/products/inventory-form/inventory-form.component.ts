import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessagesComponent } from '@shared/components/error-messages/error-messages.component';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { InventoryProductForm } from '@shared/types/inventory.types';
import { map } from 'rxjs';
import { InventoryService } from '../../../../../shared/services/inventory.service';

@Component({
    selector: 'app-inventory-form',
    imports: [ReactiveFormsModule, TextControlComponent, ErrorMessagesComponent],
    templateUrl: './inventory-form.component.html',
    styleUrl: './inventory-form.component.scss',
})
export class InventoryFormComponent {
    private readonly inventoryService = inject(InventoryService);
    private readonly fb = inject(NonNullableFormBuilder);
    public readonly form = input.required<InventoryProductForm>();
    public availableMaterials = toSignal(
        this.inventoryService
            .getAll()
            .pipe(map((inventory) => inventory.filter((inv) => inv.amount - inv.used > 0)))
    );

    public addInventory(): void {
        const newInventory = this.fb.group({
            duringManufacture: false,
            inventoryId: ['', Validators.required],
            cost: [0, [Validators.required, Validators.min(0)]],
            quantityInUse: [0, [Validators.required, Validators.min(0)]],
            quantityInCost: [0, [Validators.required, Validators.min(0)]],
        });
        newInventory.controls.inventoryId.valueChanges.subscribe((inventoryId) => {
            const inventory = this.availableMaterials()?.find((inv) => inv._id === inventoryId);
            newInventory.controls.cost.setValue(
                inventory ? inventory.totalCost / inventory.amount : 0,
                { emitEvent: false }
            );
        });
        this.form().controls.inventory.push(newInventory);
    }

    public removeInventory(index: number): void {
        this.form().controls.inventory.removeAt(index);
    }
}
