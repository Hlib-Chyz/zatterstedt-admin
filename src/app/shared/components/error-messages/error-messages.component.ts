import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessagesType } from '@shared/types/error-messages.types';

@Component({
    selector: 'app-error-messages',
    templateUrl: './error-messages.component.html',
    imports: [KeyValuePipe],
})
export class ErrorMessagesComponent {
    public readonly errors = input.required<ValidationErrors | undefined | null>();
    public readonly touched = input.required<boolean | undefined>();
    public readonly errorMessages: ErrorMessagesType = {
        required: () => 'The field is required',
        min: () => 'The field must be greater than 0',
        email: () => 'The field is not valid',
        minlength: () => 'The field must contain more than 6 characters.',
    };
}
