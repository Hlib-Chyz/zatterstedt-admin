import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { ClientForm } from '@shared/types/client.types';

@Component({
    selector: 'app-client-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './client-form.component.html'
})
export class ClientFormComponent {
    public readonly form = input.required<ClientForm>();
}
