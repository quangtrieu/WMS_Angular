import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockEnquiryComponent } from './stockEnquiry.component';
import { StockEnquirySearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '', component: StockEnquiryComponent, children: [
            { path: 'Search', component: StockEnquirySearchComponent },
            // { path: '**', component: NotFoundComponent },
        ]
    }
];

