import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceComponent } from "./invoice.component";
import { InvoiceSearchComponent } from "./search/searchInvoice.component";
import { InvoiceAddUpdateComponent } from "./addUpdate/addUpdateInvoice.component";
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: InvoiceComponent, children: [
      { path: 'Search', component: InvoiceSearchComponent },
      { path: 'Add/:ro/:id', component: InvoiceAddUpdateComponent },
      { path: 'Update/:id', component: InvoiceAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

