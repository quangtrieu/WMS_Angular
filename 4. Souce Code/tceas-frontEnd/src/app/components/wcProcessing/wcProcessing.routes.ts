import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WCProcessingComponent } from "./wcProcessing.component";
import { SearchWCProcessingComponent } from "./search/searchWCProcessing.component";
import { WCProcessingAddUpdateComponent } from "./addUpdate/addUpdateWCProcessing.component";


//import { NotFoundComponent } from "../error/notFound/notFound.component";

export const routes: Routes = [
  {
    path: '', component: WCProcessingComponent, children: [
      { path: 'Search', component: SearchWCProcessingComponent },
      { path: 'Update/:id', component: WCProcessingAddUpdateComponent },
      // { path: '**', component: NotFoundComponent },
    ]
  }
];

