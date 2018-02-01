import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { DashboardSAComponent } from "./saView/dashboardSA.component";
import { DashboardCustomerComponent } from "./customerView/dashboardCustomer.component";
import { DashboardSpecialistComponent } from './specialistView/dashboardSpecialist.component';
import { DashboardFMCHComponent } from './fmchView/dashboardFMCH.component';
import { DashboardMainComponent } from './main/dashboardMain.component';

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'main', component: DashboardMainComponent },
      { path: 'sa', component: DashboardSAComponent },
      { path: 'customer', component: DashboardCustomerComponent },
      { path: 'fmch', component: DashboardFMCHComponent },
      { path: 'specialist', component: DashboardSpecialistComponent },
    ]
  }
];

