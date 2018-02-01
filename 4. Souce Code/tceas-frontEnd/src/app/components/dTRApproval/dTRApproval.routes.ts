import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechnicalReportApprovalComponent } from "./dTRApproval.component";
import { TechnicalReportApprovalSearchComponent } from "./search/search.technicalReportApproval.component";
import { TechnicalReportApprovalAddUpdateComponent } from "./addUpdate/addUpdateApproval.technicalReport.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: TechnicalReportApprovalComponent, children: [
      { path: 'Search', component: TechnicalReportApprovalSearchComponent },
      { path: 'Add', component: TechnicalReportApprovalAddUpdateComponent },
      { path: 'Update/:id', component: TechnicalReportApprovalAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

