import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { routes } from './customer.routes';

import { SearchCustomerComponent } from "./search/searchCustomer.component";
import { CustomerAddUpdateComponent } from "./addUpdate/addUpdateCustomer.component";
import { SharedModule } from "../shared/shared.module";
import { CustomerComponent } from "./customer.component";
import { CustomerService } from "./services/customer.service";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2Module } from 'ng2-select2';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        SharedModule,
        Ng2Bs3ModalModule,
        Select2Module,
        RouterModule.forChild(routes)],
    declarations: [
        CustomerComponent,
        SearchCustomerComponent,
        CustomerAddUpdateComponent,
    ],
    providers: [CustomerService],
})

export class CustomerModule {
    static routes = routes;
}
