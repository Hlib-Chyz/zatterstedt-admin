import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsComponent } from '@app/pages/home/tabs/clients/clients.component';
import { InventoryComponent } from '@app/pages/home/tabs/inventory/inventory.component';
import { OrdersComponent } from '@app/pages/home/tabs/orders/orders.component';
import { ProductsComponent } from '@app/pages/home/tabs/products/products.component';
import { Tabs } from '@shared/types/tab.types';
import { filter } from 'rxjs';

@Component({
    templateUrl: 'home.component.html',
    styleUrl: 'home.component.scss',
    imports: [ProductsComponent, ClientsComponent, InventoryComponent, OrdersComponent],
})
export default class HomeComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);
    public activeTab: string = Tabs.Products;
    public readonly productsTabName = Tabs.Products;
    public readonly clientsTabName = Tabs.Clients;
    public readonly inventoryTabName = Tabs.Inventory;
    public readonly ordersTabName = Tabs.Orders;
    public readonly tabs = [
        this.productsTabName,
        this.clientsTabName,
        this.inventoryTabName,
        this.ordersTabName,
    ];

    public ngOnInit(): void {
        this.activatedRoute.fragment
            .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
            .subscribe((fragment) => {
                this.activeTab = fragment;
            });
    }

    public setActiveTab(tab: string): void {
        this.router.navigate([], { fragment: tab });
    }
}
