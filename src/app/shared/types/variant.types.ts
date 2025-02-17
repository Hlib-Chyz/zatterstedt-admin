import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { StockVariantProduct } from '@shared/types/stock.types';
import { Guid } from 'guid-typescript';

export type VariantProduct = {
    _id: string;
    size: string;
    color: string;
    stock: StockVariantProduct;
};

export type Variant = {
    _id: string;
    name: string;
};

export type VariantOrder = {
    variantId: string;
    quantity: number;
    price: number;
};

export type NewVariant = {
    size: string;
    color: string;
    quantity: number;
};

export type VariantsControl = FormArray<
    FormGroup<{
        id: FormControl<Guid>;
        size: FormControl<string>;
        color: FormControl<string>;
        quantity: FormControl<number>;
    }>
>;

export type VariantForm = FormGroup<{
    productId: FormControl<string>;
    variants: VariantsControl;
}>;

export type CanSaveVariantsResponse = {
    canSaveVariants: boolean;
};
