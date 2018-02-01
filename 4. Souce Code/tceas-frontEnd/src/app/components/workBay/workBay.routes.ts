import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkBayComponent } from "./workBay.component";
import { SearchWorkBayComponent } from "./search/searchWorkBay.component";
import { WorkBayAddUpdateComponent } from "./addUpdate/addUpdateWorkBay.component";


//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: WorkBayComponent, children: [
      { path: 'Search', component: SearchWorkBayComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

