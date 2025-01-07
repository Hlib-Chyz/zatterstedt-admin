import { Component, effect, inject, input, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RealizedPartyFormComponent } from '@app/pages/home/tabs/products/variant/realized-party-form/realized-party-form.component';
import { VariantFormComponent } from '@app/pages/home/tabs/products/variant/variant-form/variant-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import { ProductService } from '@shared/services/product.service';
import { StockService } from '@shared/services/stock.service';
import { VariantService } from '@shared/services/variant.service';
import { RealizedPartyForm } from '@shared/types/stock.types';
import { VariantForm, VariantProduct, VariantsControl } from '@shared/types/variant.types';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-variant',
    imports: [
        ReactiveFormsModule,
        PopupComponent,
        MatIconModule,
        VariantFormComponent,
        RealizedPartyFormComponent,
    ],
    templateUrl: './variant.component.html',
    styleUrl: './variant.component.scss',
})
export class VariantComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly productService = inject(ProductService);
    private readonly variantService = inject(VariantService);
    private readonly stockService = inject(StockService);
    public variants = input.required<VariantProduct[]>();
    public productId = input.required<string>();
    public variantPopupRef = viewChild<PopupComponent>('variantPopup');
    public realizedPartyPopupRef = viewChild<PopupComponent>('realizedPartyPopup');
    public readonly variantForm: VariantForm = this.fb.group({
        productId: ['', Validators.required],
        variants: this.fb.array([]) as unknown as VariantsControl,
    });
    public readonly realizedPartyForm: RealizedPartyForm = this.fb.group({
        variantId: ['', Validators.required],
        realizedParty: [0, Validators.required],
    });
    public canSaveVariants = false;

    public constructor() {
        effect(() => {
            this.variantService
                .canSaveVariants(this.variants().map(({ _id }) => _id))
                .subscribe(({ canSaveVariants }) => {
                    this.canSaveVariants = canSaveVariants;
                });
        });
    }

    public openVariantPopup(): void {
        this.variantForm.controls.variants.clear();
        this.variantForm.controls.productId.setValue(this.productId());
        const variants = this.variants();
        if (variants.length) {
            variants.forEach((variant) => {
                this.variantForm.controls.variants.push(
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
        } else {
            this.variantForm.controls.variants.push(
                this.fb.group({
                    size: ['', Validators.required],
                    color: ['', Validators.required],
                    quantity: [0, [Validators.required, Validators.min(0)]],
                    realizedParty: [0, [Validators.required, Validators.min(0)]],
                })
            );
        }
        this.variantPopupRef()?.openPopup();
    }

    public setVariants(): void {
        if (this.variantForm.valid) {
            this.variantService
                .setVariants({
                    ...this.variantForm.getRawValue(),
                    oldVariantIds: this.variants().map(({ _id }) => _id),
                })
                .pipe(switchMap(() => this.productService.getProducts()))
                .subscribe(() => {
                    this.variantPopupRef()?.closePopup();
                });
        } else {
            this.variantForm.markAllAsTouched();
        }
    }

    public openRealizedPartyPopup(variantId: string, realizedParty: number): void {
        this.realizedPartyForm.setValue({
            variantId,
            realizedParty,
        });
        this.realizedPartyPopupRef()?.openPopup();
    }

    public setRealizedParty(): void {
        if (this.realizedPartyForm.valid) {
            this.stockService
                .setRealizedParty(this.realizedPartyForm.getRawValue())
                .pipe(switchMap(() => this.productService.getProducts()))
                .subscribe(() => {
                    this.realizedPartyPopupRef()?.closePopup();
                });
        } else {
            this.realizedPartyForm.markAllAsTouched();
        }
    }
}
