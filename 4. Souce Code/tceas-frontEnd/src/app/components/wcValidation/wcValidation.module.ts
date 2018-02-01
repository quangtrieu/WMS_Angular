import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './wcValidation.routes';

import { WCValidationComponent } from "./wcValidation.component";
import { SearchWCValidationComponent } from "./search/searchWCValidation.component";
import { WCValidationAddUpdateComponent } from "./addUpdate/addUpdateWCValidation.component";

@NgModule({
    imports: [
        CommonModule, FormsModule,
        RouterModule.forChild(routes)],
    declarations: [
        WCValidationComponent,
        SearchWCValidationComponent,
        WCValidationAddUpdateComponent
    ],
    providers: [],
})

export class WCvalidationModule {
    static routes = routes;
}
