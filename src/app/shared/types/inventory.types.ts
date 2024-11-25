import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type Inventory = {
    _id: string;
    name: string;
    totalCost: number;
    amount: number;
    used: number;
    date: string;
};

export type EditableInventory = {
    _id: string;
    name: string;
    totalCost: number;
    amount: number;
    used: number;
    date: Date;
};

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
    used: FormControl<number>;
    date: FormControl<Date>;
}>;

export type InventoryFormArray = FormArray<
    FormGroup<{
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
