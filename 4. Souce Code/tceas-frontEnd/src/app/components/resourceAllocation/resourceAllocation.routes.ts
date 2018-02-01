import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceAllocationComponent } from "./resourceAllocation.component";
import { SearchRAComponent } from "./search/searchRA.component";
import { AssignMechanicRAComponent } from "./assign/assignMechanicRA.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
    {
        path: '', component: ResourceAllocationComponent, children: [
            { path: 'Search', component: SearchRAComponent },
            { path: 'Assgin/:id', component: AssignMechanicRAComponent },
            // { path: '**', component: NotFoundComponent },
        ]
    }
];

