import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { VariantOrder } from '@shared/types/variant.types';

export type Order = {
    _id: string;
    date: string;
    client: string;
    variants: string[];
    orderNumber: string;
};

export type NewOrder = {
    contacts: string;
    date: string;
    clientName: string;
    clientId: string;
    variants: VariantOrder[];
};

export type OrderForm = FormGroup<{
    contacts: FormControl<string>;
    date: FormControl<string>;
    clientName: FormControl<string>;
    clientId: FormControl<string>;
    variants: FormArray<
        FormGroup<{
            _id: FormControl<string>;
            quantity: FormControl<number>;
            price: FormControl<number>;
        }>
    >;
}>;
