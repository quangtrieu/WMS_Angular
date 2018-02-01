import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Select2Module } from "ng2-select2";
import { SharedModule } from "../shared/shared.module";

import { routes } from './workBay.routes';
import { WorkBayComponent } from "./workBay.component";
import { SearchWorkBayComponent } from "./search/searchWorkBay.component";
import { WorkBayAddUpdateComponent } from "./addUpdate/addUpdateWorkBay.component";
import { WorkBayService } from "./services/workBay.service";

@NgModule({
    imports: [
        SharedModule,
        Select2Module,
        CommonModule, FormsModule,
        RouterModule.forChild(routes)],
    declarations: [
        WorkBayComponent,
        SearchWorkBayComponent,
        WorkBayAddUpdateComponent
    ],
    providers: [WorkBayService],
})

export class WorkBayModule {
    static routes = routes;
}
