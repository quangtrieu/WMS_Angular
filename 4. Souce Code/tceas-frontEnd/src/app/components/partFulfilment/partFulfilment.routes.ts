import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartFulfilmentComponent } from "./partFulfilment.component";
import { SearchPartFFMComponent } from "./search/searchPartFFM.component";
import { PartFFMAddUpdateComponent } from "./addUpdate/addUpdatePartFFM.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: PartFulfilmentComponent, children: [
      { path: 'Search', component: SearchPartFFMComponent },
      { path: 'Update/:id', component: PartFFMAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

