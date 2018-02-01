import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { JobGroupSearchComponent } from "./search/search.component";
import { JobGroupAddUpdateComponent } from "./addUpdate/addUpdate.component";
import { SharedModule } from "../shared/shared.module";
import { JobGroupService } from "./services/jobGroup.service";
import { routes } from './jobGroup.routes';
import { JobGroupComponent } from "./jobGroup.component";

/* export const routes = [
    { path: '', component: JobGroupSearchComponent, pathMatch: 'full' }
];
 */
@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        Ng2Bs3ModalModule,
        SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        JobGroupComponent,
        JobGroupSearchComponent,
        JobGroupAddUpdateComponent,
    ],
    providers: [ JobGroupService ],
})

export class JobGroupModule {
    static routes = routes;
}
