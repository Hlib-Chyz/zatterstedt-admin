import { FormGroup, FormControl } from '@angular/forms';

export type StockVariantProduct = {
    total: number;
    sold: number;
    realizedParty: number;
};

export type RealizedPartyForm = FormGroup<{
    variantId: FormControl<string>;
    realizedParty: FormControl<number>;
}>;
