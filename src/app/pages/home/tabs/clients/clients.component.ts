import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ClientFormComponent } from '@app/pages/home/tabs/clients/client-form/client-form.component';
import PopupComponent from '@shared/components/popup/popup.component';
import TableComponent from '@shared/components/table/table.component';
import { ClientService } from '@shared/services/client.service';
import { Client, ClientForm } from '@shared/types/client.types';
import { ColumnsFromData } from '@shared/types/table.types';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-clients',
    imports: [TableComponent, ClientFormComponent, PopupComponent],
    templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
    private readonly clientService = inject(ClientService);
    private readonly fb = inject(NonNullableFormBuilder);
    public data = signal<Client[]>([]);
    public columns: ColumnsFromData<Client> = [
        { field: 'name', name: 'Name' },
        { field: 'contacts', name: 'Contacts' },
        { field: 'purchases', name: 'Purchases' },
    ];
    public form: ClientForm = this.fb.group({
        _id: ['', Validators.required],
        contacts: ['', Validators.required],
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
        this.clientService
            .setContactsInfo(this.form.getRawValue())
            .pipe(switchMap(() => this.getData()))
            .subscribe(() => {
                this.popupRef()?.closePopup();
            });
    }

    public setContactsInfo(client: Client): void {
        this.form.setValue({ _id: client._id, contacts: client.contacts });
        this.popupRef()?.openPopup();
    }

    private getData(): Observable<Client[]> {
        return this.clientService.getAll().pipe(
            tap((clients) => {
                this.data.set(clients);
            })
        );
    }
}
