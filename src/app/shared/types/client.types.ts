import { FormControl, FormGroup } from '@angular/forms';

export type Client = {
    _id: string;
    name: string;
    contact: string;
    purchases: string[];
};

export type ClientForm = FormGroup<{
    _id: FormControl<string>;
    contact: FormControl<string>;
}>;
