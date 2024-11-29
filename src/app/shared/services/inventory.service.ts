import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EditableInventory, Inventory, NewInventory } from '@shared/types/inventory.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
    private readonly http = inject(HttpClient);
    private readonly controller = 'inventory';

    public getAll(): Observable<Inventory[]> {
        return this.http.get<Inventory[]>(this.controller);
    }

    public add(body: NewInventory): Observable<Response> {
        return this.http.post<Response>(this.controller, body);
    }

    public update(body: EditableInventory): Observable<Response> {
        return this.http.put<Response>(this.controller, body);
    }

    public delete(id: string): Observable<Response> {
        return this.http.delete<Response>(`${this.controller}/${id}`);
    }
}
