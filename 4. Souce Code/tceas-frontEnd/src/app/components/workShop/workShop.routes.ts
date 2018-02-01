import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkShopComponent } from "./workShop.component";
import { SearchWorkShopComponent } from "./search/searchWorkShop.component";
import { WorkShopAddUpdateComponent } from "./addUpdate/addUpdateWorkShop.component";

//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: WorkShopComponent, children: [
      { path: 'Search', component: SearchWorkShopComponent },
      { path: 'Add', component: WorkShopAddUpdateComponent },
      { path: 'Update/:id', component: WorkShopAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

