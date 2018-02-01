import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './jobFulfilment.routes'
import { JobFulfilmentComponent } from "./jobFulfilment.component";
import { JobFulfilmentSearchComponent } from "./search/jobFulfilmentSearch.component";
import { JobFulfilmentService } from "./services/jobFulfilment.service";
import { JobFulfilmentAddUpdateComponent } from "./addUpdate/jobFulfilmentAddUpdate.component";
import { WorkBayService } from "../workBay/services/workBay.service";
import { AssignTechnicianComponent } from "./assignTechnician/assignTechnician.component";


@NgModule({
    imports: [
        CommonModule, FormsModule,
        RouterModule.forChild(routes)],
    declarations: [
        JobFulfilmentComponent,
        JobFulfilmentSearchComponent,
        JobFulfilmentAddUpdateComponent,
        AssignTechnicianComponent
    ],
    providers: [JobFulfilmentService , WorkBayService],
})

export class JobFulfilmentModule {
    static routes = routes;
}
