import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualityControlComponent } from "./qualityControl.component";
import { SearchQualityControlComponent } from "./search/searchQualityControl.component";
import { AddUpdateQualityControlComponent } from "./addUpdate/addUpdateQualityControl.component";
import { AddUpdateRateJobFFComponent } from "./rateJobFF/addUpdateRateJobFF.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
    {
        path: '', component: QualityControlComponent, children: [
            { path: 'Search', component: SearchQualityControlComponent },
            { path: 'Update/:id', component: AddUpdateQualityControlComponent },
            { path: 'rate/:id', component: AddUpdateRateJobFFComponent },
            // { path: '**', component: NotFoundComponent },
        ]
    }
];

