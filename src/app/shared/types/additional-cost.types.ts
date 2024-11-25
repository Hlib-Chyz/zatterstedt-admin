import { FormControl, FormGroup } from '@angular/forms';

export type AdditionalCost = {
    _id: string;
    cost: number;
};

export type AdditionalCostForm = FormGroup<{
    cost: FormControl<number>;
    _id: FormControl<string>;
}>;
