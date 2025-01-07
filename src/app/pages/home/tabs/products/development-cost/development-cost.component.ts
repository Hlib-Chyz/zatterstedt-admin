import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DevelopmentCostFormComponent } from '@app/pages/home/tabs/products/development-cost/development-cost-form/development-cost-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import { DevelopmentCostService } from '@shared/services/development-cost.service';
import { ProductService } from '@shared/services/product.service';
import {
    DevelopmentCostForm,
    DevelopmentCostProduct,
    NewDevelopmentCost,
} from '@shared/types/development-cost.types';
import { Product } from '@shared/types/product.types';
import { extractFormDataWithoutId } from '@shared/utilities/extract-form-data-without-id';
import { formatDateToYYYYMMDD } from '@shared/utilities/format-date-to-yyyymmdd';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-development-cost',
    imports: [
        ReactiveFormsModule,
        DevelopmentCostFormComponent,
        PopupComponent,
        CurrencyPipe,
        MatIconModule,
    ],
    templateUrl: './development-cost.component.html',
    styleUrl: './development-cost.component.scss',
})
export class DevelopmentCostComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly developmentCostService = inject(DevelopmentCostService);
    private readonly productService = inject(ProductService);
    private deletedDevelopmentCostId = '';
    public product = input.required<Product>();
    public developmentCostPopupRef = viewChild<PopupComponent>('developmentCostPopup');
    public confirmationPopupRef = viewChild<PopupComponent>('confirmationPopup');
    public readonly developmentCostForm: DevelopmentCostForm = this.fb.group({
        _id: '',
        date: [formatDateToYYYYMMDD(), Validators.required],
        description: ['', Validators.required],
        cost: [0, [Validators.required, Validators.min(0)]],
        productId: ['', Validators.required],
    });

    public openDevelopmentCostPopup(
        productId: string,
        developmentCost?: DevelopmentCostProduct
    ): void {
        if (developmentCost) {
            this.developmentCostForm.setValue({
                ...developmentCost,
                productId,
            });
        } else {
            this.developmentCostForm.setValue({
                _id: '',
                date: formatDateToYYYYMMDD(),
                description: '',
                cost: 0,
                productId,
            });
        }
        this.developmentCostPopupRef()?.openPopup();
    }

    public actionDevelopmentCost(): void {
        if (this.developmentCostForm.invalid) {
            this.developmentCostForm.markAllAsTouched();
            return;
        }
        const formData = this.developmentCostForm.getRawValue();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { productId, ...rest } = formData;
        const saveOperation = formData._id
            ? this.developmentCostService.update(rest)
            : this.developmentCostService.add(
                  extractFormDataWithoutId<NewDevelopmentCost>(formData)
              );
        saveOperation.pipe(switchMap(() => this.productService.getProducts())).subscribe(() => {
            this.developmentCostPopupRef()?.closePopup();
        });
    }

    public removeDevelopmentCost(): void {
        this.developmentCostService
            .delete(this.deletedDevelopmentCostId)
            .pipe(switchMap(() => this.productService.getProducts()))
            .subscribe(() => {
                this.confirmationPopupRef()?.closePopup();
            });
    }

    public openConfirmationPopup(id: string): void {
        this.deletedDevelopmentCostId = id;
        this.confirmationPopupRef()?.openPopup();
    }
}
