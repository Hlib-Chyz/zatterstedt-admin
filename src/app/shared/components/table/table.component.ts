import { Component, EventEmitter, input, Output, viewChild } from '@angular/core';
import PopupComponent from '@shared/components/popup/popup.component';
import { IsArrayPipe } from '@shared/components/table/pipes/is-array.pipe';
import { ColumnsFromData } from '@shared/types/table.types';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    imports: [PopupComponent, IsArrayPipe],
})
export default class TableComponent<T extends { _id: string }> {
    @Output() public update = new EventEmitter<T>();
    @Output() public add = new EventEmitter<void>();
    @Output() public remove = new EventEmitter<string>();
    private removedId = '';
    public popupRef = viewChild<PopupComponent>('popup');
    public readonly columns = input.required<ColumnsFromData<T>>();
    public readonly isShowNumber = input<boolean>(false);
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
