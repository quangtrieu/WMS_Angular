import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchModelVariantComponent } from "./search/searchModelVariant.component";
import { AddUpdateModelVariantComponent } from "./addUpdate/addUpdateModelVariant.component";
import { ModelVariantComponent } from "./modelVariant.component";
//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: ModelVariantComponent, children: [
      { path: 'Search', component: SearchModelVariantComponent },
      { path: 'Add', component: AddUpdateModelVariantComponent },
      { path: 'Update/:id', component: AddUpdateModelVariantComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

