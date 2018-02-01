import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './repairOrder2.routes';

import { RepairOrder2Component } from "./repairOrder2.component";
import { ROv2AddUpdateComponent } from "./addUpdate/addUpdateROv2.component";
import { ROv2SearchComponent } from "./search/searchROv2.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        RepairOrder2Component,
        ROv2SearchComponent,
        ROv2AddUpdateComponent
    ],
    providers: [],
})

export class RepairOrder2Module {
    static routes = routes;
}
