import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { POComponent } from './po.component';
import { POAddUpdateComponent } from './addUpdate/addUpdate.component';
import { POSearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '', component: POComponent, children: [
            { path: 'Search', component: POSearchComponent },
            { path: 'Add', component: POAddUpdateComponent },
            { path: 'Update/:id', component: POAddUpdateComponent },
            // { path: '**', component: NotFoundComponent },
        ]
    }
];

