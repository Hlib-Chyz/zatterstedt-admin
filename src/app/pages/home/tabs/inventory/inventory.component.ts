import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { InventoryFormComponent } from '@app/pages/home/tabs/inventory/inventory-form/inventory-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import TableComponent from '@shared/components/table/table.component';
import { InventoryHttpService } from '@shared/services/inventory-http.service';
import { Inventory, InventoryForm, NewInventory } from '@shared/types/inventory.types';
import { ColumnsFromData } from '@shared/types/table.types';
import { extractFormDataWithoutId } from '@shared/utilities/extract-form-data-without-id';
import { formatDateToYYYYMMDD } from '@shared/utilities/format-date-to-yyyymmdd';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-inventory',
    imports: [TableComponent, PopupComponent, InventoryFormComponent],
    templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
    private readonly inventoryHttpService = inject(InventoryHttpService);
    private readonly fb = inject(NonNullableFormBuilder);
    public readonly columns: ColumnsFromData<Inventory> = [
        {
            field: 'name',
            name: 'Name',
        },
        {
            field: 'totalCost',
            name: 'Total Cost',
        },
        {
            field: 'amount',
            name: 'Amount',
        },
        {
            field: 'used',
            name: 'Used',
        },
        {
            field: 'paid',
            name: 'Paid',
        },
        {
            field: 'date',
            name: 'Date',
        },
    ];
    public data = signal<Inventory[]>([]);
    public form: InventoryForm = this.fb.group({
        _id: '',
        name: ['', Validators.required],
        totalCost: [0, [Validators.required, Validators.min(0)]],
        amount: [0, [Validators.required, Validators.min(0)]],
        used: [0, [Validators.required, Validators.min(0)]],
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
            ? this.inventoryHttpService.update(formData)
            : this.inventoryHttpService.add(extractFormDataWithoutId<NewInventory>(formData));
        saveOperation.pipe(switchMap(() => this.getData())).subscribe(() => {
            this.popupRef()?.closePopup();
        });
    }

    public add(): void {
        this.form.setValue({
            _id: '',
            name: '',
            totalCost: 0,
            amount: 0,
            used: 0,
            date: formatDateToYYYYMMDD(),
        });
        this.popupRef()?.openPopup();
    }

    public update(item: Inventory): void {
        this.form.setValue(item);
        this.popupRef()?.openPopup();
    }

    public remove(id: string): void {
        this.inventoryHttpService
            .delete(id)
            .pipe(switchMap(() => this.getData()))
            .subscribe();
    }

    private getData(): Observable<Inventory[]> {
        return this.inventoryHttpService.getAll().pipe(
            tap((inventory) => {
                this.data.set(inventory);
            })
        );
    }
}
