import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { UsedForm } from '@shared/types/inventory.types';

@Component({
    selector: 'app-used-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './used-form.component.html',
})
export class UsedFormComponent {
    public readonly form = input.required<UsedForm>();
}
