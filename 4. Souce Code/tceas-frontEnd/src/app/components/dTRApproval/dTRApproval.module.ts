import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './dTRApproval.routes';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { TechnicalReportApprovalComponent } from "./dTRApproval.component";
import { TechnicalReportApprovalSearchComponent } from "./search/search.technicalReportApproval.component";
import { TechnicalReportApprovalAddUpdateComponent } from "./addUpdate/addUpdateApproval.technicalReport.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng2Bs3ModalModule,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        TechnicalReportApprovalComponent,
        TechnicalReportApprovalSearchComponent,
        TechnicalReportApprovalAddUpdateComponent
    ],
    providers: [],
})

export class DTRApprovalModule {
    static routes = routes;
}
