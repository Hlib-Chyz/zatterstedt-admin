import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { ProductForm } from '@shared/types/product.type';

@Component({
    selector: 'app-product-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
    public readonly form = input.required<ProductForm>();
}
