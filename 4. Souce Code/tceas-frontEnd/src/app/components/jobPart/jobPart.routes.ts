import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobPartSearchComponent } from "./search/searchJobPart.component";
import { JobPartComponent } from "./jobPart.component";
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: JobPartComponent, children: [
      { path: 'Search', component: JobPartSearchComponent },
     
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

