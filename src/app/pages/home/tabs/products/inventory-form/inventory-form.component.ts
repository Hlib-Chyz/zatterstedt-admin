import { Component, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessagesComponent } from '@shared/components/error-messages/error-messages.component';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { Inventory, InventoryProductForm } from '@shared/types/inventory.types';

@Component({
    selector: 'app-inventory-form',
    imports: [ReactiveFormsModule, TextControlComponent, ErrorMessagesComponent],
    templateUrl: './inventory-form.component.html',
    styleUrl: './inventory-form.component.scss',
})
export class InventoryFormComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    public readonly form = input.required<InventoryProductForm>();
    public availableInventory = input.required<Inventory[]>();

    public addInventory(): void {
        const newInventory = this.fb.group({
            duringManufacture: false,
            inventoryId: ['', Validators.required],
            cost: [0, [Validators.required, Validators.min(0)]],
            quantityInUse: [0, [Validators.required, Validators.min(0)]],
            quantityInCost: [0, [Validators.required, Validators.min(0)]],
        });
        newInventory.controls.inventoryId.valueChanges.subscribe((inventoryId) => {
            const inventory = this.availableInventory()?.find((inv) => inv._id === inventoryId);
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
