import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './invoice.routes';

import { SharedModule } from "../shared/shared.module";
import { InvoiceComponent } from "./invoice.component";
import { InvoiceSearchComponent } from "./search/searchInvoice.component";
import { InvoiceAddUpdateComponent } from "./addUpdate/addUpdateInvoice.component";
import { RONoAddUpdateComponent } from "./dialogSearchRONo/addUpdateRONo.component";
import { InvoiceService } from "./services/invoice.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        InvoiceComponent,
        InvoiceSearchComponent,
        InvoiceAddUpdateComponent,
        RONoAddUpdateComponent
    ],
    providers: [InvoiceService],
})

export class InvoiceModule {
    static routes = routes;
}
