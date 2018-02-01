import { SearchVehicleMakeComponent } from './search/searchVehicleMake.component';
import { VehicleMakeComponent } from './vehicleMake.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchVehicleMakeComponentV2 } from './search_v2/make.component';

export const routes: Routes = [
  {
    path: '', component: VehicleMakeComponent, children: [
      { path: 'Search', component: SearchVehicleMakeComponent },
      // { path: 'SearchV2', component: SearchVehicleMakeComponentV2 },
    ]
  }
];

