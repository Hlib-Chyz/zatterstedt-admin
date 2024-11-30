import { InventoryManufacturingCostProduct } from '@shared/types/inventory.types';
import { JobManufacturingCostProduct } from '@shared/types/job.types';

export type ManufacturingCostProduct = {
    _id: string;
    job: JobManufacturingCostProduct[];
    inventory: InventoryManufacturingCostProduct[];
};
