import { StockAdjustmentSearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { routes } from './stockAdjustment.routes';

import { SharedModule } from "../shared/shared.module";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2Module } from 'ng2-select2';
import { StockAdjustmentAddUpdateComponent } from './addUpdate/addUpdate.component';
import { StockAdjustmentService } from './services/stockAdjustment.service';
import { StockAdjustmentComponent } from './stockAdjustment.component';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        SharedModule,
        Ng2Bs3ModalModule,
        Select2Module,
        RouterModule.forChild(routes)],
    declarations: [
        StockAdjustmentComponent,
        StockAdjustmentSearchComponent,
        StockAdjustmentAddUpdateComponent,
    ],
    providers: [StockAdjustmentService],
})

export class StockAdjustmentModule {
    static routes = routes;
}
