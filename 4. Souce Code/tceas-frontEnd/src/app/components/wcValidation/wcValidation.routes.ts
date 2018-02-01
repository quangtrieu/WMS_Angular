import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WCValidationComponent } from "./wcValidation.component";
import { SearchWCValidationComponent } from "./search/searchWCValidation.component";
import { WCValidationAddUpdateComponent } from "./addUpdate/addUpdateWCValidation.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: WCValidationComponent, children: [
      { path: 'Search', component: SearchWCValidationComponent },
      { path: 'Add', component: WCValidationAddUpdateComponent },
      { path: 'Update/:id', component: WCValidationAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

