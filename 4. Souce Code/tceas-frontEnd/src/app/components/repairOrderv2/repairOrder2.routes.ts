import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairOrder2Component } from "./repairOrder2.component";
import { ROv2SearchComponent } from "./search/searchROv2.component";
import { ROv2AddUpdateComponent } from "./addUpdate/addUpdateROv2.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: RepairOrder2Component, children: [
      { path: 'Searchv2', component: ROv2SearchComponent },
      { path: 'Add', component: ROv2AddUpdateComponent },
      { path: 'Update/:id', component: ROv2AddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

