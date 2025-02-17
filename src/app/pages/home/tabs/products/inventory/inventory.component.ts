import { Component, effect, inject, input, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InventoryFormComponent } from '@app/pages/home/tabs/products/inventory/inventory-form/inventory-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import { InventoryService } from '@shared/services/inventory.service';
import { ManufacturingCostService } from '@shared/services/manufacturing-cost.service';
import { ProductService } from '@shared/services/product.service';
import { InventoryFormArray, InventoryProductForm } from '@shared/types/inventory.types';
import { ManufacturingCostProduct } from '@shared/types/manufacturing-cost.types';
import { VariantProduct } from '@shared/types/variant.types';
import { Guid } from 'guid-typescript';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-inventory',
    imports: [ReactiveFormsModule, PopupComponent, MatIconModule, InventoryFormComponent],
    templateUrl: './inventory.component.html',
})
export class InventoryComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly productService = inject(ProductService);
    private readonly manufacturingCostService = inject(ManufacturingCostService);
    public variantIds = input([] as string[], {
        // eslint-disable-next-line @angular-eslint/no-input-rename
        alias: 'variants',
        transform: (variants: VariantProduct[]) => variants.map(({ _id }) => _id),
    });
    public readonly inventoryService = inject(InventoryService);
    public inventoryPopupRef = viewChild<PopupComponent>('inventoryPopup');
    public manufacturingCost = input.required<ManufacturingCostProduct>();
    public readonly inventoryForm: InventoryProductForm = this.fb.group({
        _id: ['', Validators.required],
        inventory: this.fb.array([]) as unknown as InventoryFormArray,
    });
    public canSaveInventory = true;

    public constructor() {
        effect(() => {
            this.manufacturingCostService
                .canSaveInventory(this.variantIds())
                .subscribe(({ canSaveInventory }) => {
                    this.canSaveInventory = canSaveInventory;
                });
        });
    }

    public openInventoryPopup(manufacturingCost: ManufacturingCostProduct): void {
        this.inventoryService.refresh$.next();
        this.inventoryForm.controls.inventory.clear();
        if (manufacturingCost.inventory.length) {
            manufacturingCost.inventory.forEach((inv) => {
                const newInventory = this.fb.group({
                    id: Guid.create(),
                    duringManufacture: inv.duringManufacture,
                    inventoryId: [inv.inventoryId, Validators.required],
                    quantityInUse: [inv.quantityInUse, [Validators.required, Validators.min(0)]],
                    quantityInCost: [inv.quantityInCost, [Validators.required, Validators.min(0)]],
                    cost: [inv.cost, [Validators.required, Validators.min(0)]],
                });
                newInventory.controls.inventoryId.valueChanges.subscribe((inventoryId) => {
                    const inventory = this.inventoryService
                        .inventory()
                        ?.find((inv) => inv._id === inventoryId);
                    newInventory.controls.cost.setValue(
                        inventory ? inventory.totalCost / inventory.amount : 0,
                        { emitEvent: false }
                    );
                });
                this.inventoryForm.controls.inventory.push(newInventory);
            });
        } else {
            const newInventory = this.fb.group({
                id: Guid.create(),
                duringManufacture: false,
                inventoryId: ['', Validators.required],
                quantityInUse: [0, [Validators.required, Validators.min(0)]],
                quantityInCost: [0, [Validators.required, Validators.min(0)]],
                cost: [0, [Validators.required, Validators.min(0)]],
            });
            newInventory.controls.inventoryId.valueChanges.subscribe((inventoryId) => {
                const inventory = this.inventoryService
                    .inventory()
                    ?.find((inv) => inv._id === inventoryId);
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

    public updateInventory(): void {
        if (this.inventoryForm.valid) {
            const { _id, inventory } = this.inventoryForm.getRawValue();
            this.manufacturingCostService
                .updateInventory({
                    _id,
                    inventory: inventory.map((inv) => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { id, ...rest } = inv;
                        return rest;
                    }),

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
