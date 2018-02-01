import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './wcProcessing.routes';
import { WCProcessingComponent } from "./wcProcessing.component";
import { SearchWCProcessingComponent } from "./search/searchWCProcessing.component";
import { WCProcessingAddUpdateComponent } from "./addUpdate/addUpdateWCProcessing.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule, FormsModule,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        WCProcessingComponent,
        SearchWCProcessingComponent,
        WCProcessingAddUpdateComponent
    ],
    providers: [],
})

export class WCProcessingModule {
    static routes = routes;
}
