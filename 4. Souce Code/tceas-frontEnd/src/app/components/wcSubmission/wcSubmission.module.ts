import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './wcSubmission.routes';
import { WarrantyClaimSubmissionComponent } from "./wcSubmission.component";
import { SearchWCSubmissionComponent } from "./search/searchWCSubmission.component";
import { WCSubmissionAddUpdateComponent } from "./addUpdate/addUpdateWCSubmission.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule, FormsModule,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        WarrantyClaimSubmissionComponent,
        SearchWCSubmissionComponent,
        WCSubmissionAddUpdateComponent
    ],
    providers: [],
})

export class WCSubmissionModule {
    static routes = routes;
}
