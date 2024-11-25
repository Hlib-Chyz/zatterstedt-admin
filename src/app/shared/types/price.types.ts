import { FormControl, FormGroup } from '@angular/forms';

export type PriceForm = FormGroup<{
    price: FormControl<number>;
    productId: FormControl<string>;
}>;
