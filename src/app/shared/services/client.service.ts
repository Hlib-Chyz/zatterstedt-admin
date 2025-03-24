import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '@shared/types/client.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'client';

    public getAll(): Observable<Client[]> {
        return this.http.get<Client[]>(this.controller);
    }

    public updateContact({ _id, contact }: { _id: string; contact: string }): Observable<unknown> {
        return this.http.put<unknown>(`${this.controller}/contact/${_id}`, {
            contact,
        });
    }
}
