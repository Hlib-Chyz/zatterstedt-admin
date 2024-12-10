import { Component, inject } from '@angular/core';
import { LoaderService } from '@shared/services/loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.scss',
    imports: [],
})
export class LoaderComponent {
    public readonly loaderService = inject(LoaderService);
}
