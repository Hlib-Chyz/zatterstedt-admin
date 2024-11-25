import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { FixedCostForm } from '@shared/types/fixed-cost.types';

@Component({
    selector: 'app-fixed-cost-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './fixed-cost-form.component.html'
})
export class FixedCostFormComponent {
    public readonly form = input.required<FixedCostForm>();
}
