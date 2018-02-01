import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobGroupSearchComponent } from "./search/search.component";
import { JobGroupAddUpdateComponent } from "./addUpdate/addUpdate.component";
import { JobGroupComponent } from "./jobGroup.component";
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: JobGroupComponent, children: [
      { path: 'Search', component: JobGroupSearchComponent },
      { path: 'Add', component: JobGroupAddUpdateComponent },
      { path: 'Update/:id', component: JobGroupAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

