import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { DevelopmentCostForm } from '@shared/types/development-cost.types';

@Component({
    selector: 'app-development-cost-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './development-cost-form.component.html'
})
export class DevelopmentCostFormComponent {
    public readonly form = input.required<DevelopmentCostForm>();
}
