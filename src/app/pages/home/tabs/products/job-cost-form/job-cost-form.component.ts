import { Component, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { JobForm } from '@shared/types/job.types';

@Component({
    selector: 'app-job-cost-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './job-cost-form.component.html',
    styleUrl: './job-cost-form.component.scss'
})
export class JobFormComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    public readonly form = input.required<JobForm>();

    public addJob(): void {
        this.form().controls.jobs.push(
            this.fb.group({
                name: ['', Validators.required],
                cost: [0, [Validators.required, Validators.min(0)]],
            })
        );
    }

    public removeJob(index: number): void {
        this.form().controls.jobs.removeAt(index);
    }
}
