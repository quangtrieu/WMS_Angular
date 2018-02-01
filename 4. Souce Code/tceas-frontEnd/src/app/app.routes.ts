import { Routes } from '@angular/router';
// import { ErrorComponent } from './error/error.component';


export const ROUTES: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', loadChildren: 'app/components/login/login.module#LoginModule' },
  { path: '', loadChildren: 'app/components/layout/layout.module#LayoutModule' }
];
