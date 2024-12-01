import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { AdditionalCostForm } from '@shared/types/additional-cost.types';

@Component({
    selector: 'app-additional-cost-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './additional-cost-form.component.html'
})
export class AdditionalCostFormComponent {
    public readonly form = input.required<AdditionalCostForm>();
}
