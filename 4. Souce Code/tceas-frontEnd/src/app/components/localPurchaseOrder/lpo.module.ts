import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './lpo.routes';

import { SharedModule } from "../shared/shared.module";
import { LPOComponent } from "./lpo.component";
import { SearchLPOComponent } from "./search/searchLPO.component";
import { LPOAddUpdateComponent } from "./addUpdate/addUpdateLPO.component";
import { LocalPurchaseOrderService } from "./services/localPurchaseOrder.service";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LPOComponent,
        SearchLPOComponent,
        LPOAddUpdateComponent,
    ],
    providers: [
        LocalPurchaseOrderService
    ],
})

export class LPOModule {
    static routes = routes;
}
