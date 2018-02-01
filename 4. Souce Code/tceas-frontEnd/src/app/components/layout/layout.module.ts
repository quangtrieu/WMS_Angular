import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { ROUTES } from './layout.routes';
import { SharedModule } from "../shared/shared.module";
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

@NgModule({
    imports: [
        ROUTES,
        SharedModule,
        SlimLoadingBarModule.forRoot()
    ],
    exports: [SlimLoadingBarModule],
    declarations: [
        LayoutComponent,
    ]
})

export class LayoutModule {

}
