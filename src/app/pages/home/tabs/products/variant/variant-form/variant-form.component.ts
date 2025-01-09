import { Component, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { VariantForm } from '@shared/types/variant.types';

@Component({
    selector: 'app-variant-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './variant-form.component.html',
    styleUrl: './variant-form.component.scss',
})
export class VariantFormComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    public readonly form = input.required<VariantForm>();
    public canSave = input(true);

    public addVariant(): void {
        this.form().controls.variants.push(
            this.fb.group({
                size: ['', Validators.required],
                color: ['', Validators.required],
                quantity: [0, [Validators.required, Validators.min(0)]],
            })
        );
    }

    public removeVariant(index: number): void {
        this.form().controls.variants.removeAt(index);
    }
}
