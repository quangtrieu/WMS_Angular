import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentComponent } from "./appointment.component";
import { SearchAppointmentComponent } from "./search/searchAppointment.component";
import { AddUpdateAppointmentComponent } from "./addUpdate/addUpdateAppointment.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: AppointmentComponent, children: [
      { path: 'Search', component: SearchAppointmentComponent },
      { path: 'Add', component: AddUpdateAppointmentComponent },
      { path: 'Add/:vehicleId', component: AddUpdateAppointmentComponent },
      { path: 'Update/:id', component: AddUpdateAppointmentComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

