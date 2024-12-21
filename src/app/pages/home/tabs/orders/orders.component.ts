import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import {
    FormArray,
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    Validators,
} from '@angular/forms';
import { OrderFormComponent } from '@app/pages/home/tabs/orders/order-form/order-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import TableComponent from '@shared/components/table/table.component';
import { OrderService } from '@shared/services/order.service';
import { Order, OrderForm } from '@shared/types/order.types';
import { ColumnsFromData } from '@shared/types/table.types';
import { formatDateToYYYYMMDD } from '@shared/utilities/format-date-to-yyyymmdd';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-orders',
    imports: [PopupComponent, OrderFormComponent, TableComponent],
    templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
    private readonly orderService = inject(OrderService);
    private readonly fb = inject(NonNullableFormBuilder);
    public data = signal<Order[]>([]);
    public columns: ColumnsFromData<Order> = [
        { field: 'date', name: 'Date' },
        { field: 'client', name: 'Client' },
        { field: 'variants', name: 'Variants' },
        { field: 'orderNumber', name: 'Order Number' },
    ];
    public form: OrderForm = this.fb.group({
        date: [formatDateToYYYYMMDD(), Validators.required],
        contacts: '',
        clientName: '',
        clientId: '',
        variants: this.fb.array([]) as unknown as FormArray<
            FormGroup<{
                _id: FormControl<string>;
                quantity: FormControl<number>;
                price: FormControl<number>;
            }>
        >,
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
        this.orderService
            .add(this.form.getRawValue())
            .pipe(switchMap(() => this.getData()))
            .subscribe(() => {
                this.popupRef()?.closePopup();
            });
    }

    public add(): void {
        this.form.controls.variants.clear();
        this.form.setValue({
            date: formatDateToYYYYMMDD(),
            contacts: '',
            clientName: '',
            clientId: '',
            variants: [],
        });
        this.popupRef()?.openPopup();
    }

    private getData(): Observable<Order[]> {
        return this.orderService.getAll().pipe(
            tap((orders) => {
                this.data.set(orders.reverse());
            })
        );
    }
}
