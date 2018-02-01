import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicalReportSubmissionComponent } from "./dTRSubmission.component";
import { TechnicalReportSubmissionSearchComponent } from "./search/search.technicalReportSubmission.component";
import { TechnicalReportSubmissionAddUpdateComponent } from "./addUpdate/addUpdateSubmission.technicalReport.component";
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: TechnicalReportSubmissionComponent, children: [
      { path: 'Search', component: TechnicalReportSubmissionSearchComponent },
      { path: 'Add', component: TechnicalReportSubmissionAddUpdateComponent },
      { path: 'Update/:id', component: TechnicalReportSubmissionAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];
