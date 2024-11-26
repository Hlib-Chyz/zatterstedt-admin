import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type JobManufacturingCostProduct = {
    name: string;
    cost: number;
};

export type JobForm = FormGroup<{
    job: FormArray<FormGroup<{ name: FormControl<string>; cost: FormControl<number> }>>;
    _id: FormControl<string>;
}>;
