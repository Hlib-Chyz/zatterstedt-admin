import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { VariantOrder, VariantOrderProduct } from './variant.types';

export type Order = {
    _id: string;
    date: string;
    contacts: string;
    variants: string[];
};

export type NewOrder = {
    date: string;
    contacts: string;
    userName: string;
    variants: VariantOrder[];
};

export type OrderProduct = {
    _id: string;
    date: string;
    userName: string;
    variants: VariantOrderProduct[];
};

export type OrderForm = FormGroup<{
    contacts: FormControl<string>;
    date: FormControl<string>;
    userName: FormControl<string>;
    variants: FormArray<
        FormGroup<{
            _id: FormControl<string>;
            quantity: FormControl<number>;
            price: FormControl<number>;
        }>
    >;
}>;
