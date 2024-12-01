import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { PriceForm } from '@shared/types/price.types';

@Component({
    selector: 'app-price-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './price-form.component.html'
})
export class PriceFormComponent {
    public readonly form = input.required<PriceForm>();
}
