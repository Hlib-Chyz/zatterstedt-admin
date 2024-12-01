import { Component, inject, input, viewChild } from '@angular/core';
import {
    FormArray,
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { JobFormComponent } from '@app/pages/home/tabs/products/job/job-cost-form/job-cost-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import { ManufacturingCostService } from '@shared/services/manufacturing-cost.service';
import { ProductService } from '@shared/services/product.service';
import { JobForm } from '@shared/types/job.types';
import { ManufacturingCostProduct } from '@shared/types/manufacturing-cost.types';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-job',
    imports: [ReactiveFormsModule, PopupComponent, MatIconModule, JobFormComponent],
    templateUrl: './job.component.html',
})
export class JobComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly productService = inject(ProductService);
    private readonly manufacturingCostService = inject(ManufacturingCostService);
    public manufacturingCost = input.required<ManufacturingCostProduct>();
    public jobPopupRef = viewChild<PopupComponent>('jobPopup');
    public readonly jobForm: JobForm = this.fb.group({
        job: this.fb.array([]) as unknown as FormArray<
            FormGroup<{ name: FormControl<string>; cost: FormControl<number> }>
        >,
        _id: ['', Validators.required],
    });

    public openJobPopup(manufacturingCost: ManufacturingCostProduct): void {
        this.jobForm.controls.job.clear();
        if (manufacturingCost.job.length) {
            manufacturingCost.job.forEach((job) => {
                this.jobForm.controls.job.push(
                    this.fb.group({
                        name: [job.name, Validators.required],
                        cost: [job.cost, [Validators.required, Validators.min(0)]],
                    })
                );
            });
        } else {
            this.jobForm.controls.job.push(
                this.fb.group({
                    name: ['', Validators.required],
                    cost: [0, [Validators.required, Validators.min(0)]],
                })
            );
        }
        this.jobForm.patchValue({
            _id: manufacturingCost._id,
        });
        this.jobPopupRef()?.openPopup();
    }

    public changeJob(): void {
        if (this.jobForm.valid) {
            this.manufacturingCostService
                .setJob(this.jobForm.getRawValue())
                .pipe(switchMap(() => this.productService.getProducts()))
                .subscribe(() => {
                    this.jobPopupRef()?.closePopup();
                });
        } else {
            this.jobForm.markAllAsTouched();
        }
    }
}
