import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AdditionalCostFormComponent } from '@app/pages/home/tabs/products/additional-cost/additional-cost-form/additional-cost-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import { AdditionalCostService } from '@shared/services/additional-cost.service';
import { ProductService } from '@shared/services/product.service';
import { AdditionalCost, AdditionalCostForm } from '@shared/types/additional-cost.types';
import { Product } from '@shared/types/product.type';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-additional-cost',
    imports: [
        ReactiveFormsModule,
        AdditionalCostFormComponent,
        PopupComponent,
        CurrencyPipe,
        MatIconModule,
    ],
    templateUrl: './additional-cost.component.html',
})
export class AdditionalCostComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly productService = inject(ProductService);
    private readonly additionalCostService = inject(AdditionalCostService);
    public product = input.required<Product>();
    public additionalCostPopupRef = viewChild<PopupComponent>('additionalCostPopup');
    public readonly additionalCostForm: AdditionalCostForm = this.fb.group({
        cost: [0, [Validators.required, Validators.min(0)]],
        _id: ['', Validators.required],
    });

    public openAdditionalCostPopup(additionalCost: AdditionalCost): void {
        this.additionalCostForm.setValue(additionalCost);
        this.additionalCostPopupRef()?.openPopup();
    }

    public setAdditionalCost(): void {
        if (this.additionalCostForm.valid) {
            this.additionalCostService
                .update(this.additionalCostForm.getRawValue())
                .pipe(switchMap(() => this.productService.getProducts()))
                .subscribe(() => {
                    this.additionalCostPopupRef()?.closePopup();
                });
        } else {
            this.additionalCostForm.markAllAsTouched();
        }
    }
}
