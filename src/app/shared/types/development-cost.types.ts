import { FormControl, FormGroup } from '@angular/forms';

export type DevelopmentCostProduct = {
    _id: string;
    date: string;
    description: string;
    cost: number;
};

export type NewDevelopmentCost = {
    date: Date;
    description: string;
    cost: number;
    productId: string;
};

export type DevelopmentCostForm = FormGroup<{
    date: FormControl<Date>;
    description: FormControl<string>;
    cost: FormControl<number>;
    productId: FormControl<string>;
}>;
