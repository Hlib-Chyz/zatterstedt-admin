import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { FixedCostFormComponent } from '@app/pages/home/tabs/fixed-costs/fixed-cost-form/fixed-cost-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import TableComponent from '@shared/components/table/table.component';
import { FixedCostService } from '@shared/services/fixed-cost.service';
import { FixedCost, FixedCostForm, NewFixedCost } from '@shared/types/fixed-cost.types';
import { ColumnsFromData } from '@shared/types/table.types';
import { extractFormDataWithoutId } from '@shared/utilities/extract-form-data-without-id';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-fixed-costs',
    imports: [PopupComponent, FixedCostFormComponent, TableComponent],
    templateUrl: './fixed-costs.component.html',
    styleUrl: './fixed-costs.component.scss',
})
export class FixedCostsComponent implements OnInit {
    private readonly fixedCostService = inject(FixedCostService);
    private readonly fb = inject(NonNullableFormBuilder);
    public data = signal<FixedCost[]>([]);
    public columns: ColumnsFromData<FixedCost> = [
        { field: 'name', name: 'Name' },
        { field: 'cost', name: 'Cost' },
    ];
    public form: FixedCostForm = this.fb.group({
        _id: '',
        name: ['', Validators.required],
        cost: [0, [Validators.required, Validators.min(0)]],
    });
    public popupRef = viewChild<PopupComponent>('popup');

    public ngOnInit(): void {
        this.getData().subscribe();
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const formData = this.form.getRawValue();
        const saveOperation = formData._id
            ? this.fixedCostService.update(formData)
            : this.fixedCostService.add(extractFormDataWithoutId<NewFixedCost>(formData));
        saveOperation.pipe(switchMap(() => this.getData())).subscribe(() => {
            this.popupRef()?.closePopup();
        });
    }

    public add(): void {
        this.form.setValue({
            _id: '',
            name: '',
            cost: 0,
        });
        this.popupRef()?.openPopup();
    }

    public update(item: FixedCost): void {
        this.form.setValue(item);
        this.popupRef()?.openPopup();
    }

    public remove(id: string): void {
        this.fixedCostService
            .delete(id)
            .pipe(switchMap(() => this.getData()))
            .subscribe();
    }

    private getData(): Observable<FixedCost[]> {
        return this.fixedCostService.getAll().pipe(
            tap((fixedCosts) => {
                this.data.set(fixedCosts);
            })
        );
    }
}
