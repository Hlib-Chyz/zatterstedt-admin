import { Component, inject, input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesComponent } from '@shared/components/error-messages/error-messages.component';
import { startWith } from 'rxjs';

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
export class TextControlComponent implements OnInit {
    private readonly controlContainer = inject(ControlContainer, { optional: true });
    public readonly label = input.required<string>();
    public readonly controlName = input.required<string>();
    public readonly type = input<'text' | 'number' | 'date' | 'checkbox' | 'password' | 'email'>(
        'text'
    );

    public get parentFormGroup(): FormGroup {
        return this.controlContainer?.control as FormGroup;
    }

    public get control(): FormControl {
        return this.parentFormGroup?.get(this.controlName()) as FormControl;
    }

    public ngOnInit(): void {
        if (this.control) {
            this.control.valueChanges.pipe(startWith(this.control.value)).subscribe((value) => {
                if (value !== null && value !== void 0) {
                    let transformedValue = value;
                    switch (this.type()) {
                        case 'number':
                            transformedValue = Number(value);
                            break;
                        case 'checkbox':
                            transformedValue = value === 'true' || value === true;
                            break;
                    }
                    if (transformedValue !== value) {
                        this.control.setValue(transformedValue, { emitEvent: false });
                    }
                }
            });
        }
    }
}
