import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { StockVariantProduct } from '@shared/types/stock.types';

export type VariantProduct = {
    _id: string;
    size: string;
    color: string;
    stock: StockVariantProduct;
};

export type VariantNewProduct = {
    size: string;
    color: string;
    quantity: number;
    realizedParty: number;
};

export type Variant = {
    _id: string;
    name: string;
};

export type VariantOrder = {
    _id: string;
    quantity: number;
    price: number;
};

export type NewVariant = {
    size: string;
    color: string;
    quantity: number;
    realizedParty: number;
};

export type VariantsControl = FormArray<
    FormGroup<{
        size: FormControl<string>;
        color: FormControl<string>;
        quantity: FormControl<number>;
        realizedParty: FormControl<number>;
    }>
>;

export type VariantForm = FormGroup<{
    productId: FormControl<string>;
    variants: VariantsControl;
}>;

export type CanSaveVariantsResponse = {
    canSaveVariants: boolean;
};
