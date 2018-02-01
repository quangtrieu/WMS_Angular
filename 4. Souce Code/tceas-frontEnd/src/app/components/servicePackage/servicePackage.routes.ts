import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicePackageComponent } from "./servicePackage.component";
import { ServicePackageSearchComponent } from "./search/searchServicePackage.component";
import { ServicePackageAddUpdateComponent } from "./addUpdate/addUpdateServicePackage.component";
import { ServicePackageAddUpdateComponentV2 } from './addUpdate.v2/addUpdateServicePackage.component';
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
    {
        path: '', component: ServicePackageComponent, children: [
            { path: 'Addv2', component: ServicePackageAddUpdateComponentV2 },
            { path: 'Search', component: ServicePackageSearchComponent },
            { path: 'Add', component: ServicePackageAddUpdateComponent },
            { path: 'Update/:id', component: ServicePackageAddUpdateComponent },
            // { path: '**', component: NotFoundComponent },
        ]
    }
];

