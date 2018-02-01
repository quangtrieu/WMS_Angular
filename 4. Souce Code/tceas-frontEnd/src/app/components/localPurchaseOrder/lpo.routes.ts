import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LPOComponent } from "./lpo.component";
import { SearchLPOComponent } from "./search/searchLPO.component";
import { LPOAddUpdateComponent } from "./addUpdate/addUpdateLPO.component";
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: LPOComponent, children: [
      { path: 'Search', component: SearchLPOComponent },
      { path: 'Add', component: LPOAddUpdateComponent },
      { path: 'Update/:id', component: LPOAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

