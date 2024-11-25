import { Component, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { ProductForm } from '@shared/types/product.type';

@Component({
    selector: 'app-product-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    public readonly form = input.required<ProductForm>();

    public addVariant(): void {
        this.form().controls.variants.push(
            this.fb.group({
                size: ['', Validators.required],
                color: ['', Validators.required],
                quantity: [0, [Validators.required, Validators.min(0)]],
                realizedParty: [0, [Validators.required, Validators.min(0)]],
            })
        );
    }

    public removeVariant(index: number): void {
        this.form().controls.variants.removeAt(index);
    }
}
