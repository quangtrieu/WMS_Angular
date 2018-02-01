import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './dTRSubmission.routes';

import { ImportComponent } from "../shared/importBtn/import.component";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { TechnicalReportSubmissionComponent } from "./dTRSubmission.component";
import { TechnicalReportSubmissionSearchComponent } from "./search/search.technicalReportSubmission.component";
import { TechnicalReportSubmissionAddUpdateComponent } from "./addUpdate/addUpdateSubmission.technicalReport.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule, FormsModule,
        Ng2Bs3ModalModule,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        TechnicalReportSubmissionComponent,
        TechnicalReportSubmissionSearchComponent,
        TechnicalReportSubmissionAddUpdateComponent,
    ],
    providers: [],
})

export class DTRSubmissionModule {
    static routes = routes;
}
