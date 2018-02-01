import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopPersonnelComponent } from "./workshopPersonnel.component";
import { WorkshopPersonnelSearchComponent } from "./search/searchWorkshopPersonnel.component";
import { WorkshopPersonnelAddUpdateComponent } from "./addUpdate/addUpdateWorkshopPersonnel.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: WorkshopPersonnelComponent, children: [
      { path: 'Search', component: WorkshopPersonnelSearchComponent },
      { path: 'Add', component: WorkshopPersonnelAddUpdateComponent },
      { path: 'Update/:id', component: WorkshopPersonnelAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

