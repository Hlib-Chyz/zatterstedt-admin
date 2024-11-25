import { StockVariantProduct } from './stock.service';

export type VariantProduct = {
    _id: string;
    size: string;
    color: string;
    stock: StockVariantProduct;
};

export type VariantNewProduct = {
    size: string;
    color: string;
    quantity: number;
    realizedParty: number;
};

export type VariantOrderProduct = {
    name: string;
    quantity: number;
    cost: number;
};

export type Variant = {
    _id: string;
    name: string;
};

export type VariantOrder = {
    _id: string;
    quantity: number;
    price: number;
};
