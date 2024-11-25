import { InventoryManufacturingCostProduct } from './inventory.types';
import { JobManufacturingCostProduct } from './job.types';

export type ManufacturingCostProduct = {
    _id: string;
    jobs: JobManufacturingCostProduct[];
    inventory: InventoryManufacturingCostProduct[];
};
