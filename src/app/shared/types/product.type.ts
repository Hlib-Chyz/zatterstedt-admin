import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AdditionalCost } from '@shared/types/additional-cost.types';
import { DevelopmentCostProduct } from '@shared/types/development-cost.types';
import { ManufacturingCostProduct } from '@shared/types/manufacturing-cost.types';
import { OrderProduct } from '@shared/types/order.types';
import { VariantNewProduct, VariantProduct } from '@shared/types/variant.types';

export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    variants: VariantProduct[];
    developmentCosts: DevelopmentCostProduct[];
    additionalCost: AdditionalCost;
    manufacturingCost: ManufacturingCostProduct;
    orders: OrderProduct[];
};

export type EditableProduct = {
    _id: string;
    price: number;
    description: string;
    name: string;
    variants: VariantNewProduct[];
};

export type NewProduct = Omit<EditableProduct, '_id'>;

export type ProductForm = FormGroup<{
    _id: FormControl<string>;
    name: FormControl<string>;
    description: FormControl<string>;
    price: FormControl<number>;
    variants: FormArray<
        FormGroup<{
            size: FormControl<string>;
            color: FormControl<string>;
            quantity: FormControl<number>;
            realizedParty: FormControl<number>;
        }>
    >;
}>;
