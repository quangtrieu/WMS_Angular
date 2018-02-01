import { ROAddUpdateV3Component } from './addUpdateV3/addUpdateRO.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './repairOrder.routes';
import { SharedModule } from "../shared/shared.module";

import { RepairOrderComponent } from "./repairOrder.component";
import { ROSearchComponent } from "./search/searchRO.component";
import { ROAddUpdateComponent } from "./addUpdate/addUpdateRO.component";
import { RepairOrderService } from "./services/repairOrder.service";
import { JPCBService } from "../jPCB/services/jPCB.service";
import { JPCBModule } from "../jPCB/jPCB.module";
import { ROv2AddUpdateComponent } from "./addUpdateV2/addUpdateROv2.component";

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        SharedModule,
        JPCBModule,
        RouterModule.forChild(routes)],
    declarations: [
        RepairOrderComponent,
        ROSearchComponent,
        ROAddUpdateComponent,
        ROAddUpdateV3Component,
        ROv2AddUpdateComponent
    ],
    providers: [RepairOrderService, JPCBService],
})

export class RepairOrderModule {
    static routes = routes;
}
