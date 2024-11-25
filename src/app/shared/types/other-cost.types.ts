import { FormControl, FormGroup } from '@angular/forms';

export type OtherCost = {
    _id: string;
    date: string;
    name: string;
    cost: number;
};

export type EditableOtherCost = {
    _id: string;
    date: Date;
    name: string;
    cost: number;
};

export type NewOtherCost = Omit<EditableOtherCost, '_id'>;

export type OtherCostForm = FormGroup<{
    _id: FormControl<string>;
    name: FormControl<string>;
    cost: FormControl<number>;
    date: FormControl<Date>;
}>;
