import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { routes } from './jPCB.routes';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule } from "../shared/shared.module";
import { JPCBComponent } from "./jPCB.component";
import { JPCBViewComponent } from "./view/viewJPCB.component";
import { JPCBService } from "./services/jPCB.service";
import { JPCBSuggestionComponent } from "./suggestion/suggestionJPCB.component";
import { JobCodeService } from "../jobCode/services/jobCode.service";
import { TimeSlotSetupService } from "../timeSlotSetup/services/timeSlotSetup.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng2Bs3ModalModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        JPCBSuggestionComponent
    ],
    declarations: [
        JPCBComponent,
        JPCBViewComponent,
        JPCBSuggestionComponent
    ],
    providers: [ JPCBService, JobCodeService, TimeSlotSetupService ],
})

export class JPCBModule {
    static routes = routes;
}
