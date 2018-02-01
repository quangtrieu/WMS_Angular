import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

import { routes } from './workShop.routes';

import { WorkShopComponent } from "./workShop.component";
import { SearchWorkShopComponent } from "./search/searchWorkShop.component";
import { WorkShopAddUpdateComponent } from "./addUpdate/addUpdateWorkShop.component";

@NgModule({
    imports: [
        CommonModule, FormsModule,
        SharedModule,
        RouterModule.forChild(routes)], 
    declarations: [
        WorkShopComponent,
        SearchWorkShopComponent,
        WorkShopAddUpdateComponent
    ],
    providers: [],
})

export class WorkShopModule {
    static routes = routes;
}