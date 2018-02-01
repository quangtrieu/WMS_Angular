import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JPCBComponent } from "./jPCB.component";
import { JPCBViewComponent } from "./view/viewJPCB.component";

export const routes: Routes = [
  {
    path: '', component: JPCBComponent, children: [
      { path: 'View', component: JPCBViewComponent }
    ]
  }
];

