import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from "./customer.component";
import { SearchCustomerComponent } from "./search/searchCustomer.component";
import { CustomerAddUpdateComponent } from "./addUpdate/addUpdateCustomer.component";

export const routes: Routes = [
    {
        path: '', component: CustomerComponent, children: [
            { path: 'Search', component: SearchCustomerComponent },
            { path: 'Add', component: CustomerAddUpdateComponent },
            { path: 'Update/:id', component: CustomerAddUpdateComponent },
            // { path: '**', component: NotFoundComponent },
        ]
    }
];

