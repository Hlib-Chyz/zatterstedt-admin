import { Component, EventEmitter, input, Output, viewChild } from '@angular/core';
import { ColumnsFromData } from '@shared/types/table.types';
import PopupComponent from '../popup/popup.component';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    imports: [PopupComponent],
})
export default class TableComponent<T extends { _id: string }> {
    @Output() public update = new EventEmitter<T>();
    @Output() public add = new EventEmitter<void>();
    @Output() public remove = new EventEmitter<string>();
    private removedId = '';
    public popupRef = viewChild<PopupComponent>('popup');
    public readonly columns = input.required<ColumnsFromData<T>>();
    public data = input.required<T[]>();
    public isVisible = false;

    public openConfirmationPopup(id: string): void {
        this.popupRef()?.openPopup();
        this.removedId = id;
    }

    public removeItem(): void {
        this.remove.emit(this.removedId);
        this.popupRef()?.closePopup();
        this.removedId = '';
    }
}
