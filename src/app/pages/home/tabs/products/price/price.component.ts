import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PriceFormComponent } from '@app/pages/home/tabs/products/price/price-form/price-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import { ProductHttpService } from '@shared/services/product-http.service';
import { ProductService } from '@shared/services/product.service';
import { PriceForm } from '@shared/types/price.types';
import { Product } from '@shared/types/product.type';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-price',
    imports: [ReactiveFormsModule, PopupComponent, CurrencyPipe, MatIconModule, PriceFormComponent],
    templateUrl: './price.component.html',
})
export class PriceComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly productService = inject(ProductService);
    private readonly productHttpService = inject(ProductHttpService);
    public product = input.required<Product>();
    public pricePopupRef = viewChild<PopupComponent>('pricePopup');
    public readonly priceForm: PriceForm = this.fb.group({
        price: [0, [Validators.required, Validators.min(0)]],
        productId: ['', Validators.required],
    });

    public openPricePopup(productId: string, price: number): void {
        this.priceForm.setValue({ productId, price });
        this.pricePopupRef()?.openPopup();
    }

    public setPrice(): void {
        if (this.priceForm.valid) {
            this.productHttpService
                .setPrice(this.priceForm.getRawValue())
                .pipe(switchMap(() => this.productService.getProducts()))
                .subscribe(() => {
                    this.pricePopupRef()?.closePopup();
                });
        } else {
            this.priceForm.markAllAsTouched();
        }
    }
}
