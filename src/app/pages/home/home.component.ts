import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Tabs } from '../../shared/types/tab.types';
import { ClientsComponent } from './tabs/clients/clients.component';
import { FixedCostsComponent } from './tabs/fixed-costs/fixed-costs.component';
import { InventoryComponent } from './tabs/inventory/inventory.component';
import { OrdersComponent } from './tabs/orders/orders.component';
import { OtherCostsComponent } from './tabs/other-costs/other-costs.component';
import { ProductsComponent } from './tabs/products/products.component';

@Component({
    templateUrl: 'home.component.html',
    styleUrl: 'home.component.scss',
    imports: [
        ProductsComponent,
        ClientsComponent,
        FixedCostsComponent,
        InventoryComponent,
        OrdersComponent,
        OtherCostsComponent,
    ]
})
export default class HomeComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);
    public activeTab: string = Tabs.Products;
    public readonly productsTabName = Tabs.Products;
    public readonly clientsTabName = Tabs.Clients;
    public readonly fixedCostsTabName = Tabs.FixedCosts;
    public readonly otherCostsTabName = Tabs.OtherCosts;
    public readonly inventoryTabName = Tabs.Inventory;
    public readonly ordersTabName = Tabs.Orders;
    public readonly tabs = [
        this.productsTabName,
        this.clientsTabName,
        this.fixedCostsTabName,
        this.otherCostsTabName,
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
