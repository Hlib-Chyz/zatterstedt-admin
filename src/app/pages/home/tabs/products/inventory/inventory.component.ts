import { Component, inject, input, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InventoryFormComponent } from '@app/pages/home/tabs/products/inventory/inventory-form/inventory-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import { InventoryService } from '@shared/services/inventory.service';
import { ManufacturingCostService } from '@shared/services/manufacturing-cost.service';
import { ProductService } from '@shared/services/product.service';
import { InventoryFormArray, InventoryProductForm } from '@shared/types/inventory.types';
import { ManufacturingCostProduct } from '@shared/types/manufacturing-cost.types';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
    selector: 'app-inventory',
    imports: [ReactiveFormsModule, PopupComponent, MatIconModule, InventoryFormComponent],
    templateUrl: './inventory.component.html',
})
export class InventoryComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly productService = inject(ProductService);
    private readonly inventoryService = inject(InventoryService);
    private readonly manufacturingCostService = inject(ManufacturingCostService);
    private refresh$ = new BehaviorSubject<void>(void 0);
    public inventory = toSignal(
        this.refresh$.pipe(switchMap(() => this.inventoryService.getAll()))
    );
    public inventoryPopupRef = viewChild<PopupComponent>('inventoryPopup');
    public manufacturingCost = input.required<ManufacturingCostProduct>();
    public readonly inventoryForm: InventoryProductForm = this.fb.group({
        _id: ['', Validators.required],
        inventory: this.fb.array([]) as unknown as InventoryFormArray,
    });

    public openInventoryPopup(manufacturingCost: ManufacturingCostProduct): void {
        this.refresh$.next();
        this.inventoryForm.controls.inventory.clear();
        if (manufacturingCost.inventory.length) {
            manufacturingCost.inventory.forEach((inv) => {
                const newInventory = this.fb.group({
                    duringManufacture: inv.duringManufacture,
                    inventoryId: [inv.inventoryId, Validators.required],
                    quantityInUse: [inv.quantityInUse, [Validators.required, Validators.min(0)]],
                    quantityInCost: [inv.quantityInCost, [Validators.required, Validators.min(0)]],
                    cost: [inv.cost, [Validators.required, Validators.min(0)]],
                });
                newInventory.controls.inventoryId.valueChanges.subscribe((inventoryId) => {
                    const inventory = this.inventory()?.find((inv) => inv._id === inventoryId);
                    newInventory.controls.cost.setValue(
                        inventory ? inventory.totalCost / inventory.amount : 0,
                        { emitEvent: false }
                    );
                });
                this.inventoryForm.controls.inventory.push(newInventory);
            });
        } else {
            const newInventory = this.fb.group({
                duringManufacture: false,
                inventoryId: ['', Validators.required],
                quantityInUse: [0, [Validators.required, Validators.min(0)]],
                quantityInCost: [0, [Validators.required, Validators.min(0)]],
                cost: [0, [Validators.required, Validators.min(0)]],
            });
            newInventory.controls.inventoryId.valueChanges.subscribe((inventoryId) => {
                const inventory = this.inventory()?.find((inv) => inv._id === inventoryId);
                newInventory.controls.cost.setValue(
                    inventory ? inventory.totalCost / inventory.amount : 0,
                    { emitEvent: false }
                );
            });
            this.inventoryForm.controls.inventory.push(newInventory);
        }
        this.inventoryForm.controls._id.setValue(manufacturingCost._id);
        this.inventoryPopupRef()?.openPopup();
    }

    public setInventory(): void {
        if (this.inventoryForm.valid) {
            this.manufacturingCostService
                .setInventory({
                    ...this.inventoryForm.getRawValue(),
                    oldInventory: this.manufacturingCost().inventory,
                })
                .pipe(switchMap(() => this.productService.getProducts()))
                .subscribe(() => {
                    this.inventoryPopupRef()?.closePopup();
                });
        } else {
            this.inventoryForm.markAllAsTouched();
        }
    }
}
