import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { VariantOrder } from '@shared/types/variant.types';
import { Guid } from 'guid-typescript';

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
            id: FormControl<Guid>;
            _id: FormControl<string>;
            quantity: FormControl<number>;
            price: FormControl<number>;
        }>
    >;
}>;
