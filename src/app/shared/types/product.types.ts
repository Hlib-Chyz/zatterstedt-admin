import { FormControl, FormGroup } from '@angular/forms';
import { AdditionalCost } from '@shared/types/additional-cost.types';
import { DevelopmentCostProduct } from '@shared/types/development-cost.types';
import { ManufacturingCostProduct } from '@shared/types/manufacturing-cost.types';
import { VariantProduct } from '@shared/types/variant.types';

export type Product = {
    _id: string;
    name: string;
    price: number;
    variants: VariantProduct[];
    developmentCosts: DevelopmentCostProduct[];
    additionalCost: AdditionalCost;
    manufacturingCost: ManufacturingCostProduct;
};

export type EditableProduct = {
    _id: string;
    price: number;
    name: string;
};

export type NewProduct = Omit<EditableProduct, '_id'>;

export type ProductForm = FormGroup<{
    _id: FormControl<string>;
    name: FormControl<string>;
    price: FormControl<number>;
}>;
