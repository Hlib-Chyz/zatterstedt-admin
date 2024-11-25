import { Component, EventEmitter, input, Output } from '@angular/core';
import { ColumnsFromData } from '@shared/types/table.types';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export default class TableComponent<T extends { _id: string }> {
    @Output() public update = new EventEmitter<T>();
    @Output() public add = new EventEmitter<void>();
    @Output() public remove = new EventEmitter<string>();
    public readonly columns = input.required<ColumnsFromData<T>>();
    public data = input.required<T[]>();
    public isVisible = false;
}
