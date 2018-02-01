import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule } from "../shared/shared.module";
import { routes } from './jobPart.routes';
import { JobPartComponent } from "./jobPart.component";
import { JobPartSearchComponent } from "./search/searchJobPart.component";
import { JobPartAddUpdateComponent } from "./addUpdate/addUpdateJobPart.component";
import { JobPartService } from "./services/jobPart.service";


@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        Ng2Bs3ModalModule,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        JobPartComponent,
        JobPartSearchComponent,
        JobPartAddUpdateComponent
    ],
    providers: [ JobPartService ],
})

export class JobPartModule {
    static routes = routes;
}
