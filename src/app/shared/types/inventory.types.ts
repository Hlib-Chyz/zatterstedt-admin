import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';

export type Inventory = {
    _id: string;
    name: string;
    totalCost: number;
    amount: number;
    used: number;
    paid: number;
    date: string;
};

export type EditableInventory = Omit<Inventory, 'paid' | 'used'>;

export type NewInventory = Omit<EditableInventory, '_id'>;

export type InventoryManufacturingCostProduct = {
    inventoryId: string;
    quantityInUse: number;
    quantityInCost: number;
    duringManufacture: boolean;
    cost: number;
};

export type InventoryForm = FormGroup<{
    _id: FormControl<string>;
    name: FormControl<string>;
    totalCost: FormControl<number>;
    amount: FormControl<number>;
    date: FormControl<string>;
}>;

export type UsedForm = FormGroup<{
    _id: FormControl<string>;
    used: FormControl<number>;
}>;

export type InventoryFormArray = FormArray<
    FormGroup<{
        id: FormControl<Guid>;
        duringManufacture: FormControl<boolean>;
        inventoryId: FormControl<string>;
        cost: FormControl<number>;
        quantityInUse: FormControl<number>;
        quantityInCost: FormControl<number>;
    }>
>;

export type InventoryProductForm = FormGroup<{
    _id: FormControl<string>;
    inventory: InventoryFormArray;
}>;

export type CanSaveInventoryResponse = {
    canSaveInventory: boolean;
};
