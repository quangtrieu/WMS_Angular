import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SearchTimeSlotSetupComponent } from "./search/searchTimeSlotSetup.component";
import { TimeSlotSetupService } from "./services/timeSlotSetup.service";
import { SharedModule } from '../shared/shared.module';
export const routes = [
    { path: '', component: SearchTimeSlotSetupComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        SearchTimeSlotSetupComponent,
    ],
    providers: [ TimeSlotSetupService ],
})

export class TimeSlotSetupModule {
    static routes = routes;
}
