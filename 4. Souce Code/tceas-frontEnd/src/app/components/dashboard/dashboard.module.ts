import { VehicleService } from './../vehicle/services/vehicle.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from './dashboard.component';
import { ReceivingDashboardComponent } from "./receiving/receiveingDashboard.component";
import { ServiceSummaryDashboardComponent } from "./serviceSummary/serviceSummaryDashboard.component";
import { DTRStatusDashboardComponent } from "./dTRStatus/dTRStatusDashboard.component";
import { WarrantyClaimStatusDashboardComponent } from "./warrantyClaimStatus/warrantyClaimStatusDashboard.component";
import { SharedModule } from "../shared/shared.module";
import { DashboardCustomerComponent } from './customerView/dashboardCustomer.component';
import { DashboardSAComponent } from './saView/dashboardSA.component';
import { routes } from './dashboard.routes';
import { DashboardFMCHComponent } from './fmchView/dashboardFMCH.component';
import { DashboardSpecialistComponent } from './specialistView/dashboardSpecialist.component';
import { DashboardMainComponent } from './main/dashboardMain.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        DashboardComponent,
        DashboardMainComponent,
        ReceivingDashboardComponent,
        ServiceSummaryDashboardComponent,
        DTRStatusDashboardComponent,
        WarrantyClaimStatusDashboardComponent,
        DashboardSAComponent,
        DashboardCustomerComponent,
        DashboardFMCHComponent,
        DashboardSpecialistComponent
    ],
    providers: [VehicleService],
})

export class DashboardModule {
    static routes = routes;
}
