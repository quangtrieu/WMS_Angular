import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './qualityControl.routes'
import { QualityControlComponent } from "./qualityControl.component";
import { SearchQualityControlComponent } from "./search/searchQualityControl.component";
import { AddUpdateQualityControlComponent } from "./addUpdate/addUpdateQualityControl.component";
import { QuantityControlService } from "./services/qualityControl.service";
import { SharedModule } from "../shared/shared.module";
import { AddUpdateRateJobFFComponent } from "./rateJobFF/addUpdateRateJobFF.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        QualityControlComponent,
        SearchQualityControlComponent,
        AddUpdateQualityControlComponent,
        AddUpdateRateJobFFComponent
    ],
    providers: [QuantityControlService],
})

export class QuanlityControlModule {
    static routes = routes;
}
