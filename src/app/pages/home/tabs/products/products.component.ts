/* eslint-disable no-param-reassign */
import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, viewChild } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AdditionalCostComponent } from '@app/pages/home/tabs/products/additional-cost/additional-cost.component';
import { DevelopmentCostComponent } from '@app/pages/home/tabs/products/development-cost/development-cost.component';
import { InventoryComponent } from '@app/pages/home/tabs/products/inventory/inventory.component';
import { JobComponent } from '@app/pages/home/tabs/products/job/job.component';
import { PriceComponent } from '@app/pages/home/tabs/products/price/price.component';
import { ProductFormComponent } from '@app/pages/home/tabs/products/product-form/product-form.component';
import { VariantComponent } from '@app/pages/home/tabs/products/variant/variant.component';
import PopupComponent from '@shared/components/popup/popup.component';
import { ProductHttpService } from '@shared/services/product-http.service';
import { ProductService } from '@shared/services/product.service';
import { EditableProduct, Product, ProductForm } from '@shared/types/product.types';
import { extractFormDataWithoutId } from '@shared/utilities/extract-form-data-without-id';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    imports: [
        CurrencyPipe,
        PopupComponent,
        AdditionalCostComponent,
        DevelopmentCostComponent,
        InventoryComponent,
        PriceComponent,
        ProductFormComponent,
        JobComponent,
        VariantComponent,
    ],
})
export class ProductsComponent implements OnInit {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly productHttpService = inject(ProductHttpService);
    public readonly productService = inject(ProductService);
    public productPopupRef = viewChild<PopupComponent>('productPopup');
    public readonly productForm: ProductForm = this.fb.group({
        _id: '',
        name: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
    });

    public ngOnInit(): void {
        this.productService.getProducts().subscribe();
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
        const additionalCost = product.additionalCost.cost / this.getTotalRealizedParty(product);
        return developmentCostsSum + inventoryCost + job + additionalCost;
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

    public openProductPopup(product?: Product): void {
        this.productForm.setValue({
            _id: product?._id ?? '',
            name: product?.name ?? '',
            price: product?.price ?? 0,
        });
        this.productPopupRef()?.openPopup();
    }

    public addProduct(): void {
        if (this.productForm.valid) {
            const formData = this.productForm.getRawValue();
            const saveOperation = formData._id
                ? this.productHttpService.update(formData)
                : this.productHttpService.add(extractFormDataWithoutId<EditableProduct>(formData));
            saveOperation.pipe(switchMap(() => this.productService.getProducts())).subscribe(() => {
                this.productPopupRef()?.closePopup();
            });
        } else {
            this.productForm.markAllAsTouched();
        }
    }
}
