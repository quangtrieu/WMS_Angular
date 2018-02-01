import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './workshopPersonnel.routes';
import { WorkshopPersonnelComponent } from "./workshopPersonnel.component";
import { WorkshopPersonnelSearchComponent } from "./search/searchWorkshopPersonnel.component";
import { WorkshopPersonnelAddUpdateComponent } from "./addUpdate/addUpdateWorkshopPersonnel.component";
import { WorkShopPersonnelService } from "./services/workShopPersonnel.service";
import { SharedModule } from "../shared/shared.module";
import { Select2Module } from "ng2-select2";

@NgModule({
    imports: [
        SharedModule,
        Select2Module,
        CommonModule, FormsModule,
        RouterModule.forChild(routes)], 
    declarations: [
        WorkshopPersonnelComponent,
        WorkshopPersonnelSearchComponent,
        WorkshopPersonnelAddUpdateComponent
    ],
    providers: [WorkShopPersonnelService],
})

export class WorkshopPersonnelModule {
    static routes = routes;
}