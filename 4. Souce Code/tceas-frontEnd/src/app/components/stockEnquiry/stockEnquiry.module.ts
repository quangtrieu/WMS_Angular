import { StockEnquiryService } from './services/stockEnquiry.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { routes } from './stockEnquiry.routes';

import { SharedModule } from "../shared/shared.module";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2Module } from 'ng2-select2';
import { StockEnquiryComponent } from './stockEnquiry.component';
import { StockEnquirySearchComponent } from './search/search.component';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        SharedModule,
        Ng2Bs3ModalModule,
        Select2Module,
        RouterModule.forChild(routes)],
    declarations: [
        StockEnquiryComponent,
        StockEnquirySearchComponent,
    ],
    providers: [StockEnquiryService],
})

export class StockEnquiryModule {
    static routes = routes;
}
