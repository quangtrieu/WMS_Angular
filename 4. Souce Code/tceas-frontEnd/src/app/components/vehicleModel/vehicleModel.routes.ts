import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchVehicleModelComponent } from "./search/searchVehicleModel.component";
import { AddUpdateVehicleModelComponent } from "./addUpdate/addUpdateVehicleModel.component";
import { VehicleModelComponent } from "./vehicleModel.component";
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: VehicleModelComponent, children: [
      { path: 'Search', component: SearchVehicleModelComponent },
      { path: 'Add', component: AddUpdateVehicleModelComponent },
      { path: 'Update/:id', component: AddUpdateVehicleModelComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

