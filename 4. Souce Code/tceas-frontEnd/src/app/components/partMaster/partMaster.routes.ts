import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartMasterComponent } from "./partMaster.component";
import { SearchPartMasterComponent } from "./search/searchPartMaster.component";
import { PartMasterAddUpdateComponent } from "./addUpdate/addUpdatePartMaster.component";

export const routes: Routes = [
  {
    path: '', component: PartMasterComponent, children: [
      { path: 'Search', component: SearchPartMasterComponent },
      { path: 'Add', component: PartMasterAddUpdateComponent },
      { path: 'Update/:id', component: PartMasterAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

