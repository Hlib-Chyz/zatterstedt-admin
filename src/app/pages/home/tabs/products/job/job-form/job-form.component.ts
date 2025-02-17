import { Component, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { JobForm } from '@shared/types/job.types';
import { Guid } from 'guid-typescript';

@Component({
    selector: 'app-job-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './job-form.component.html',
    styleUrl: './job-form.component.scss',
})
export class JobFormComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    public readonly form = input.required<JobForm>();

    public addJob(): void {
        this.form().controls.job.push(
            this.fb.group({
                id: Guid.create(),
                name: ['', Validators.required],
                cost: [0, [Validators.required, Validators.min(0)]],
            })
        );
    }

    public removeJob(index: number): void {
        this.form().controls.job.removeAt(index);
    }
}
