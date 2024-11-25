import { Component, inject, input } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesComponent } from '../error-messages/error-messages.component';

@Component({
    selector: 'app-text-control',
    templateUrl: './text-control.component.html',
    imports: [ReactiveFormsModule, ErrorMessagesComponent],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (): ControlContainer => inject(ControlContainer, { skipSelf: true }),
        },
    ],
})
export class TextControlComponent {
    private readonly controlContainer = inject(ControlContainer, { optional: true });
    public readonly label = input.required<string>();
    public readonly controlName = input.required<string>();
    public readonly type = input<'text' | 'number' | 'date' | 'checkbox' | 'password' | 'email'>(
        'text'
    );

    public get parentFormGroup(): FormGroup {
        return this.controlContainer?.control as FormGroup;
    }
}
