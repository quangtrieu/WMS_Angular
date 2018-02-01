import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockAdjustmentComponent } from './stockAdjustment.component';
import { StockAdjustmentAddUpdateComponent } from './addUpdate/addUpdate.component';
import { StockAdjustmentSearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '', component: StockAdjustmentComponent, children: [
            { path: 'Search', component: StockAdjustmentSearchComponent },
            { path: 'Add', component: StockAdjustmentAddUpdateComponent },
            { path: 'Update/:id', component: StockAdjustmentAddUpdateComponent },
            // { path: '**', component: NotFoundComponent },
        ]
    }
];

