import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { OtherCostFormComponent } from '@app/pages/home/tabs/other-costs/other-cost-form/other-cost-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import TableComponent from '@shared/components/table/table.component';
import { OtherCostService } from '@shared/services/other-cost.service';
import { NewOtherCost, OtherCost, OtherCostForm } from '@shared/types/other-cost.types';
import { ColumnsFromData } from '@shared/types/table.types';
import { extractFormDataWithoutId } from '@shared/utilities/extract-form-data-without-id';
import { formatDateToYYYYMMDD } from '@shared/utilities/format-date-to-yyyymmdd';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-other-costs',
    imports: [PopupComponent, OtherCostFormComponent, TableComponent],
    templateUrl: './other-costs.component.html',
})
export class OtherCostsComponent implements OnInit {
    private readonly otherCostService = inject(OtherCostService);
    private readonly fb = inject(NonNullableFormBuilder);
    public data = signal<OtherCost[]>([]);
    public columns: ColumnsFromData<OtherCost> = [
        { field: 'date', name: 'Date' },
        { field: 'name', name: 'Name' },
        { field: 'cost', name: 'Cost' },
    ];
    public form: OtherCostForm = this.fb.group({
        _id: '',
        name: ['', Validators.required],
        cost: [0, [Validators.required, Validators.min(0)]],
        date: [formatDateToYYYYMMDD(), Validators.required],
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
            ? this.otherCostService.update(formData)
            : this.otherCostService.add(extractFormDataWithoutId<NewOtherCost>(formData));
        saveOperation.pipe(switchMap(() => this.getData())).subscribe(() => {
            this.popupRef()?.closePopup();
        });
    }

    public add(): void {
        this.form.setValue({
            _id: '',
            name: '',
            cost: 0,
            date: formatDateToYYYYMMDD(),
        });
        this.popupRef()?.openPopup();
    }

    public update(item: OtherCost): void {
        this.form.setValue(item);
        this.popupRef()?.openPopup();
    }

    public remove(id: string): void {
        this.otherCostService
            .delete(id)
            .pipe(switchMap(() => this.getData()))
            .subscribe();
    }

    private getData(): Observable<OtherCost[]> {
        return this.otherCostService.getAll().pipe(
            tap((otherCosts) => {
                this.data.set(
                    otherCosts.sort(
                        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                );
            })
        );
    }
}
