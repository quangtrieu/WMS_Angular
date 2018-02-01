import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobCodeSearchComponent } from "./search/searchJobCode.component";
import { JobCodeAddUpdateComponent } from "./addUpdate/addUpdateJobCode.component";
import { JobCodeComponent } from "./jobCode.component";
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: JobCodeComponent, children: [
      { path: 'Search', component: JobCodeSearchComponent },
      { path: 'Add', component: JobCodeAddUpdateComponent },
      { path: 'Update/:id', component: JobCodeAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

