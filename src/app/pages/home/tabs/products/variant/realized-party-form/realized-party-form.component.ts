import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { RealizedPartyForm } from '@shared/types/stock.types';

@Component({
    selector: 'app-realized-party-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './realized-party-form.component.html',
})
export class RealizedPartyFormComponent {
    public readonly form = input.required<RealizedPartyForm>();
}
