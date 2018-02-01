import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from "./vehicle.component";
import { VehicleSearchComponent } from "./search/searchVehicle.component";
import { VehicleAddUpdateComponent } from "./addUpdate/addUpdateVehicle.component";
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: VehicleComponent, children: [
      { path: 'Search', component: VehicleSearchComponent },
      { path: 'Add', component: VehicleAddUpdateComponent },
      { path: 'Update/:id', component: VehicleAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

