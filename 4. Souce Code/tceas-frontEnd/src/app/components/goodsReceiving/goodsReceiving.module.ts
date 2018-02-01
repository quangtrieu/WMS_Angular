import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { routes } from './goodsReceiving.routes';

import { SharedModule } from "../shared/shared.module";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2Module } from 'ng2-select2';
import { GoodsReceivingComponent } from './goodsReceiving.component';
import { GoodsReceivingSearchComponent } from './search/search.component';
import { GoodsReceivingAddUpdateComponent } from './addUpdate/addUpdate.component';
import { GoodsReceivingService } from './services/goodsReceiving.service';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        SharedModule,
        Ng2Bs3ModalModule,
        Select2Module,
        RouterModule.forChild(routes)],
    declarations: [
        GoodsReceivingComponent,
        GoodsReceivingSearchComponent,
        GoodsReceivingAddUpdateComponent,
    ],
    providers: [GoodsReceivingService],
})

export class GoodsReceivingModule {
    static routes = routes;
}
