import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodsReceivingComponent } from './goodsReceiving.component';
import { GoodsReceivingAddUpdateComponent } from './addUpdate/addUpdate.component';
import { GoodsReceivingSearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '', component: GoodsReceivingComponent, children: [
            { path: 'Search', component: GoodsReceivingSearchComponent },
            { path: 'Add', component: GoodsReceivingAddUpdateComponent },
            { path: 'Update/:id', component: GoodsReceivingAddUpdateComponent },
            // { path: '**', component: NotFoundComponent },
        ]
    }
];

