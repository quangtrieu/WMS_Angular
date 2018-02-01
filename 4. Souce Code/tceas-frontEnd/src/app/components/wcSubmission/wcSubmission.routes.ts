import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarrantyClaimSubmissionComponent } from "./wcSubmission.component";
import { SearchWCSubmissionComponent } from "./search/searchWCSubmission.component";
import { WCSubmissionAddUpdateComponent } from "./addUpdate/addUpdateWCSubmission.component";
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: WarrantyClaimSubmissionComponent, children: [
      { path: 'Search', component: SearchWCSubmissionComponent },
      { path: 'Update/:id', component: WCSubmissionAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

