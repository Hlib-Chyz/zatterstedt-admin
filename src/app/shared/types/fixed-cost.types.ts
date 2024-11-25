import { FormControl, FormGroup } from '@angular/forms';

export type FixedCost = {
    _id: string;
    name: string;
    cost: number;
};

export type NewFixedCost = Omit<FixedCost, '_id'>;

export type FixedCostForm = FormGroup<{
    _id: FormControl<string>;
    name: FormControl<string>;
    cost: FormControl<number>;
}>;
