import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';

export type JobManufacturingCostProduct = {
    name: string;
    cost: number;
};

export type JobForm = FormGroup<{
    job: FormArray<
        FormGroup<{ id: FormControl<Guid>; name: FormControl<string>; cost: FormControl<number> }>
    >;
    _id: FormControl<string>;
}>;
