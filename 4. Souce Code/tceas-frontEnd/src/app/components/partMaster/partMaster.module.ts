import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { routes } from "./partMaster.routes";
import { SharedModule } from "../shared/shared.module";
import { PartMasterComponent } from "./partMaster.component";
import { SearchPartMasterComponent } from "./search/searchPartMaster.component";
import { PartMasterAddUpdateComponent } from "./addUpdate/addUpdatePartMaster.component";
import { PartMasterService } from "./services/partMaster.service";
import { Ng2Bs3ModalModule } from "ng2-bs3-modal/ng2-bs3-modal";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        Ng2Bs3ModalModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PartMasterComponent,
        SearchPartMasterComponent,
        PartMasterAddUpdateComponent,
    ],
    providers: [PartMasterService],
})

export class PartMasterModule {
    static routes = routes;
}
