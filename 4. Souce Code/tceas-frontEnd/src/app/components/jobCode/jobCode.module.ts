import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { routes } from './jobCode.routes';

import { JobCodeSearchComponent } from "./search/searchJobCode.component";
import { JobCodeAddUpdateComponent } from "./addUpdate/addUpdateJobCode.component";
import { JobCodeComponent } from "./jobCode.component";
import { JobCodeService } from "./services/jobCode.service";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule } from "../shared/shared.module";
import { JobGroupService } from "../jobGroup/services/jobGroup.service";

// export const routes = [
//     { path: '', component: JobCodeSearchComponent, pathMatch: 'full' }
// ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng2Bs3ModalModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        JobCodeComponent,
        JobCodeSearchComponent,
        JobCodeAddUpdateComponent,
    ],
    providers: [ JobCodeService, JobGroupService ],
})

export class JobCodeModule {
    static routes = routes;
}
