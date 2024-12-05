import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextControlComponent } from '@shared/components/text-control/text-control.component';
import { ClientService } from '@shared/services/client.service';
import { VariantService } from '@shared/services/variant.service';
import { OrderForm } from '@shared/types/order.types';

@Component({
    selector: 'app-order-form',
    imports: [ReactiveFormsModule, TextControlComponent],
    templateUrl: './order-form.component.html',
    styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly variantService = inject(VariantService);
    private readonly clientService = inject(ClientService);
    public readonly form = input.required<OrderForm>();
    public variants = toSignal(this.variantService.getAll());
    public clients = toSignal(this.clientService.getAll());

    public addVariant(): void {
        this.form().controls.variants.push(
            this.fb.group({
                _id: ['', Validators.required],
                quantity: [0, [Validators.required, Validators.min(0)]],
                price: [0, [Validators.required, Validators.min(0)]],
            })
        );
    }

    public removeVariant(index: number): void {
        this.form().controls.variants.removeAt(index);
    }
}
