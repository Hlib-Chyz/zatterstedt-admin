import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';

export type JobManufacturingCostProduct = {
    name: string;
    cost: number;
    date: string;
};

export type JobForm = FormGroup<{
    job: FormArray<
        FormGroup<{
            id: FormControl<Guid>;
            name: FormControl<string>;
            cost: FormControl<number>;
            date: FormControl<string>;
        }>
    >;
    _id: FormControl<string>;
}>;
