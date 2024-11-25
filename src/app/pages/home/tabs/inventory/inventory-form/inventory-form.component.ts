import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { InventoryForm } from '@shared/types/inventory.types';

@Component({
    selector: 'app-inventory-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './inventory-form.component.html'
})
export class InventoryFormComponent {
    public readonly form = input.required<InventoryForm>();
}
