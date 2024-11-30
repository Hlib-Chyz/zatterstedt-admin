import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '@shared/types/client.types';
import { DefaultResponse } from '@shared/types/response.type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'clients';

    public getAll(): Observable<Client[]> {
        return this.http.get<Client[]>(this.controller);
    }

    public setContactsInfo({
        _id,
        contacts,
    }: {
        _id: string;
        contacts: string;
    }): Observable<DefaultResponse> {
        return this.http.put<DefaultResponse>(`${this.controller}/contacts/${_id}`, {
            contacts,
        });
    }
}
