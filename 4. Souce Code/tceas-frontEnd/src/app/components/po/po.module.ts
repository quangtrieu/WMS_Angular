import { POService } from './services/po.service';
import { POSearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { routes } from './po.routes';
import { FormBuilder } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2Module } from 'ng2-select2';
import { POComponent } from './po.component';
import { POAddUpdateComponent } from './addUpdate/addUpdate.component';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        SharedModule,
        Ng2Bs3ModalModule,
        Select2Module,
        RouterModule.forChild(routes)],
    declarations: [
        POComponent,
        POSearchComponent,
        POAddUpdateComponent,
    ],
    providers: [POService,FormBuilder],
})

export class POModule {
    static routes = routes;
}
