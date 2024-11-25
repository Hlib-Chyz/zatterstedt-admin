import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { OtherCostForm } from '@shared/types/other-cost.types';

@Component({
    selector: 'app-other-cost-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './other-cost-form.component.html'
})
export class OtherCostFormComponent {
    public readonly form = input.required<OtherCostForm>();
}
