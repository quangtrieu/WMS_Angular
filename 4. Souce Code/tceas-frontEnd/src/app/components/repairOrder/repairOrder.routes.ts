import { ROAddUpdateV3Component } from './addUpdateV3/addUpdateRO.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepairOrderComponent } from "./repairOrder.component";
import { ROSearchComponent } from "./search/searchRO.component";
import { ROAddUpdateComponent } from "./addUpdate/addUpdateRO.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: RepairOrderComponent, children: [
      { path: 'Search', component: ROSearchComponent },
      { path: 'Add', component: ROAddUpdateComponent },
      { path: 'AddV3', component: ROAddUpdateV3Component },
      { path: 'UpdateV3/:id', component: ROAddUpdateV3Component },
      { path: 'Add/:vehicleId', component: ROAddUpdateComponent },
      { path: 'Update/:id', component: ROAddUpdateComponent },
      { path: 'ConvertToRO/:appoinmentId', component: ROAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

