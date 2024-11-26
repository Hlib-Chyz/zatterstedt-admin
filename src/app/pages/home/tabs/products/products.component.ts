/* eslint-disable no-param-reassign */
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { Component, inject, OnInit, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    FormArray,
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    Validators,
} from '@angular/forms';
import { AdditionalCost, AdditionalCostForm } from '@shared/types/additional-cost.types';
import { DevelopmentCostForm } from '@shared/types/development-cost.types';
import { InventoryFormArray, InventoryProductForm } from '@shared/types/inventory.types';
import { JobForm } from '@shared/types/job.types';
import { ManufacturingCostProduct } from '@shared/types/manufacturing-cost.types';
import { PriceForm } from '@shared/types/price.types';
import { extractFormDataWithoutId } from '@shared/utilities/extract-form-data-without-id';
import { formatDateToYYYYMMDD } from '@shared/utilities/format-date-to-yyyymmdd';
import { Observable, switchMap, tap } from 'rxjs';
import PopupComponent from '../../../../shared/components/popup/popup.component';
import { AdditionalCostService } from '../../../../shared/services/additional-cost.service';
import { DevelopmentCostService } from '../../../../shared/services/development-cost.service';
import { InventoryService } from '../../../../shared/services/inventory.service';
import { ManufacturingCostService } from '../../../../shared/services/manufacturing-cost.service';
import { ProductService } from '../../../../shared/services/product.service';
import { EditableProduct, Product, ProductForm } from '../../../../shared/types/product.type';
import { AdditionalCostFormComponent } from './additional-cost-form/additional-cost-form.component';
import { DevelopmentCostFormComponent } from './development-cost-form/development-cost-form.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { JobFormComponent } from './job-cost-form/job-cost-form.component';
import { PriceFormComponent } from './price-form/price-form.component';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    imports: [
        CurrencyPipe,
        NgFor,
        PopupComponent,
        AdditionalCostFormComponent,
        DevelopmentCostFormComponent,
        DatePipe,
        InventoryFormComponent,
        PriceFormComponent,
        ProductFormComponent,
        JobFormComponent,
    ],
})
export class ProductsComponent implements OnInit {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly additionalCostService = inject(AdditionalCostService);
    private readonly developmentCostService = inject(DevelopmentCostService);
    private readonly manufacturingCostService = inject(ManufacturingCostService);
    private readonly productService = inject(ProductService);
    private readonly inventoryService = inject(InventoryService);
    public additionalCostPopupRef = viewChild<PopupComponent>('additionalCostPopup');
    public developmentCostPopupRef = viewChild<PopupComponent>('developmentCostPopup');
    public inventoryPopupRef = viewChild<PopupComponent>('inventoryPopup');
    public pricePopupRef = viewChild<PopupComponent>('pricePopup');
    public productPopupRef = viewChild<PopupComponent>('productPopup');
    public jobPopupRef = viewChild<PopupComponent>('jobPopup');
    public products: Product[] = [];
    public availableMaterials = toSignal(this.inventoryService.getAll());
    public readonly additionalCostForm: AdditionalCostForm = this.fb.group({
        cost: [0, [Validators.required, Validators.min(0)]],
        _id: ['', Validators.required],
    });
    public readonly jobForm: JobForm = this.fb.group({
        job: this.fb.array([]) as unknown as FormArray<
            FormGroup<{ name: FormControl<string>; cost: FormControl<number> }>
        >,
        _id: ['', Validators.required],
    });
    public readonly developmentCostForm: DevelopmentCostForm = this.fb.group({
        date: [formatDateToYYYYMMDD(), Validators.required],
        description: ['', Validators.required],
        cost: [0, [Validators.required, Validators.min(0)]],
        productId: ['', Validators.required],
    });
    public readonly inventoryForm: InventoryProductForm = this.fb.group({
        _id: ['', Validators.required],
        inventory: this.fb.array([]) as unknown as InventoryFormArray,
    });
    public readonly productForm: ProductForm = this.fb.group({
        _id: '',
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        variants: this.fb.array(
            [] as FormGroup<{
                size: FormControl<string>;
                color: FormControl<string>;
                quantity: FormControl<number>;
                realizedParty: FormControl<number>;
            }>[]
        ),
    });
    public readonly priceForm: PriceForm = this.fb.group({
        price: [0, [Validators.required, Validators.min(0)]],
        productId: ['', Validators.required],
    });

    public ngOnInit(): void {
        this.getProducts().subscribe();
    }

    public getCostPrice(product: Product): number {
        const developmentCostsSum =
            product.developmentCosts.reduce((sum, cost) => sum + cost.cost, 0) /
            this.getTotalRealizedParty(product);
        const inventoryCost = product.manufacturingCost.inventory.reduce((sum, inv) => {
            if (inv.duringManufacture) {
                sum += (inv.quantityInCost * inv.cost) / this.getTotalRealizedParty(product);
            } else {
                sum +=
                    (inv.cost * inv.quantityInCost * this.getTotal(product)) /
                    this.getTotalRealizedParty(product);
            }
            return sum;
        }, 0);
        const job =
            (product.manufacturingCost.job.reduce((sum, job) => {
                sum += job.cost;
                return sum;
            }, 0) *
                this.getTotal(product)) /
            this.getTotalRealizedParty(product);
        return developmentCostsSum + inventoryCost + job + product.additionalCost.cost;
    }

    public getStock(product: Product): number {
        return product.variants.reduce(
            (sum, variant) => sum + (variant.stock.total - variant.stock.sold),
            0
        );
    }

    public getTotal(product: Product): number {
        return product.variants.reduce((sum, variant) => sum + variant.stock.total, 0);
    }

    public getTotalRealizedParty(product: Product): number {
        return product.variants.reduce((sum, variant) => sum + variant.stock.realizedParty, 0);
    }

    public openAdditionalCostPopup(additionalCost: AdditionalCost): void {
        this.additionalCostForm.setValue(additionalCost);
        this.additionalCostPopupRef()?.openPopup();
    }

    public closeAdditionalCostPopup(): void {
        this.additionalCostPopupRef()?.closePopup();
    }

    public openJobPopup(manufacturingCost: ManufacturingCostProduct): void {
        this.jobForm.controls.job.clear();
        if (manufacturingCost.job.length) {
            manufacturingCost.job.forEach((job) => {
                this.jobForm.controls.job.push(
                    this.fb.group({
                        name: [job.name, Validators.required],
                        cost: [job.cost, [Validators.required, Validators.min(0)]],
                    })
                );
            });
        } else {
            this.jobForm.controls.job.push(
                this.fb.group({
                    name: ['', Validators.required],
                    cost: [0, [Validators.required, Validators.min(0)]],
                })
            );
        }
        this.jobForm.patchValue({
            _id: manufacturingCost._id,
        });
        this.jobPopupRef()?.openPopup();
    }

    public closeJobPopup(): void {
        this.jobPopupRef()?.closePopup();
    }

    public openDevelopmentCostPopup(productId: string): void {
        this.developmentCostForm.setValue({
            date: formatDateToYYYYMMDD(),
            description: '',
            cost: 0,
            productId,
        });
        this.developmentCostPopupRef()?.openPopup();
    }

    public closeDevelopmentCostPopup(): void {
        this.developmentCostPopupRef()?.closePopup();
    }

    public openInventoryPopup(manufacturingCost: ManufacturingCostProduct): void {
        this.inventoryForm.controls.inventory.clear();
        if (manufacturingCost.inventory.length) {
            manufacturingCost.inventory.forEach((inv) => {
                const newInventory = this.fb.group({
                    duringManufacture: inv.duringManufacture,
                    inventoryId: [inv.inventoryId, Validators.required],
                    quantityInUse: [inv.quantityInUse, [Validators.required, Validators.min(0)]],
                    quantityInCost: [inv.quantityInCost, [Validators.required, Validators.min(0)]],
                    cost: [inv.cost, [Validators.required, Validators.min(0)]],
                });
                newInventory.controls.inventoryId.valueChanges.subscribe((inventoryId) => {
                    const inventory = this.availableMaterials()?.find(
                        (inv) => inv._id === inventoryId
                    );
                    newInventory.controls.cost.setValue(
                        inventory ? inventory.totalCost / inventory.amount : 0,
                        { emitEvent: false }
                    );
                });
                this.inventoryForm.controls.inventory.push(newInventory);
            });
        } else {
            const newInventory = this.fb.group({
                duringManufacture: false as boolean,
                inventoryId: ['', Validators.required],
                quantityInUse: [0, [Validators.required, Validators.min(0)]],
                quantityInCost: [0, [Validators.required, Validators.min(0)]],
                cost: [0, [Validators.required, Validators.min(0)]],
            });
            newInventory.controls.inventoryId.valueChanges.subscribe((inventoryId) => {
                const inventory = this.availableMaterials()?.find((inv) => inv._id === inventoryId);
                newInventory.controls.cost.setValue(
                    inventory ? inventory.totalCost / inventory.amount : 0,
                    { emitEvent: false }
                );
            });
            this.inventoryForm.controls.inventory.push(newInventory);
        }
        this.inventoryForm.controls._id.setValue(manufacturingCost._id);
        this.inventoryPopupRef()?.openPopup();
    }

    public closeInventoryPopup(): void {
        this.inventoryPopupRef()?.closePopup();
    }

    public openPricePopup(productId: string, price: number): void {
        this.priceForm.setValue({ productId, price });
        this.pricePopupRef()?.openPopup();
    }

    public closePricePopup(): void {
        this.pricePopupRef()?.closePopup();
    }

    public openProductPopup(product?: Product): void {
        this.productForm.controls.variants.clear();
        this.productForm.setValue({
            _id: product?._id ?? '',
            name: product?.name ?? '',
            price: product?.price ?? 0,
            description: product?.description ?? '',
            variants: [],
        });
        if (product) {
            product.variants.forEach((variant) => {
                this.productForm.controls.variants.push(
                    this.fb.group({
                        size: [variant.size, Validators.required],
                        color: [variant.color, Validators.required],
                        quantity: [variant.stock.total, [Validators.required, Validators.min(0)]],
                        realizedParty: [
                            variant.stock.realizedParty,
                            [Validators.required, Validators.min(0)],
                        ],
                    })
                );
            });
        }
        this.productPopupRef()?.openPopup();
    }

    public closeProductPopup(): void {
        this.productPopupRef()?.closePopup();
    }

    public setAdditionalCost(): void {
        if (this.additionalCostForm.valid) {
            this.additionalCostService
                .update(this.additionalCostForm.getRawValue())
                .pipe(switchMap(() => this.getProducts()))
                .subscribe(() => {
                    this.additionalCostPopupRef()?.closePopup();
                });
        } else {
            this.additionalCostForm.markAllAsTouched();
        }
    }

    public addDevelopmentCost(): void {
        if (this.developmentCostForm.valid) {
            this.developmentCostService
                .add(this.developmentCostForm.getRawValue())
                .pipe(switchMap(() => this.getProducts()))
                .subscribe(() => {
                    this.developmentCostPopupRef()?.closePopup();
                });
        } else {
            this.developmentCostForm.markAllAsTouched();
        }
    }

    public setInventory(): void {
        if (this.inventoryForm.valid) {
            this.manufacturingCostService
                .setInventory(this.inventoryForm.getRawValue())
                .pipe(switchMap(() => this.getProducts()))
                .subscribe(() => {
                    this.inventoryPopupRef()?.closePopup();
                });
        } else {
            this.inventoryForm.markAllAsTouched();
        }
    }

    public setPrice(): void {
        if (this.priceForm.valid) {
            this.productService
                .setPrice(this.priceForm.getRawValue())
                .pipe(switchMap(() => this.getProducts()))
                .subscribe(() => {
                    this.pricePopupRef()?.closePopup();
                });
        } else {
            this.priceForm.markAllAsTouched();
        }
    }

    public addProduct(): void {
        if (this.productForm.valid) {
            const formData = this.productForm.getRawValue();
            const saveOperation = formData._id
                ? this.productService.update(formData)
                : this.productService.add(extractFormDataWithoutId<EditableProduct>(formData));
            saveOperation.pipe(switchMap(() => this.getProducts())).subscribe(() => {
                this.productPopupRef()?.closePopup();
            });
        } else {
            this.productForm.markAllAsTouched();
        }
    }

    public changeJob(): void {
        if (this.jobForm.valid) {
            this.manufacturingCostService
                .setJob(this.jobForm.getRawValue())
                .pipe(switchMap(() => this.getProducts()))
                .subscribe(() => {
                    this.jobPopupRef()?.closePopup();
                });
        } else {
            this.jobForm.markAllAsTouched();
        }
    }

    public getProducts(): Observable<Product[]> {
        return this.productService.getAll().pipe(
            tap((products) => {
                this.products = products;
            })
        );
    }
}
