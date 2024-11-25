import { Component, output } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
})
export default class PopupComponent {
    public save = output();
    public isVisible = false;

    public openPopup(): void {
        this.isVisible = true;
    }

    public closePopup(): void {
        this.isVisible = false;
    }

    public savePopup(): void {
        this.save.emit();
    }
}
