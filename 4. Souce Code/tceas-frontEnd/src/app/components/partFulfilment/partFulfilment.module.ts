import { SharedModule } from './../shared/shared.module';
import { PartFulfillmentService } from './services/partFulfillment.service';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './partFulfilment.routes';

import { PartFulfilmentComponent } from "./partFulfilment.component";
import { SearchPartFFMComponent } from "./search/searchPartFFM.component";
import { PartFFMAddUpdateComponent } from "./addUpdate/addUpdatePartFFM.component";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PartFulfilmentComponent,
        SearchPartFFMComponent,
        PartFFMAddUpdateComponent,
    ],
    providers: [PartFulfillmentService],
})

export class PartFulfilmentModule {
    static routes = routes;
}
