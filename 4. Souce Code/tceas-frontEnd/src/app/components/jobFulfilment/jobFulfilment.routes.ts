import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobFulfilmentComponent } from "./jobFulfilment.component";
import { JobFulfilmentSearchComponent } from "./search/jobFulfilmentSearch.component";
import { JobFulfilmentAddUpdateComponent } from "./addUpdate/jobFulfilmentAddUpdate.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
    {
        path: '', component: JobFulfilmentComponent, children: [
            { path: 'Search', component: JobFulfilmentSearchComponent },
            { path: 'Update/:id', component: JobFulfilmentAddUpdateComponent }
        ]
    }
];

