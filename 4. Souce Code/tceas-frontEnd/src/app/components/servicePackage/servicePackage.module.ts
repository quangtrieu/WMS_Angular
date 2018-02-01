import { UploadServicePackageComponent } from './upload/upload.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
//import { HttpModule } from "@angular/http/src";
import { CommonModule } from "@angular/common";

import { routes } from './servicePackage.routes'
import { ServicePackageComponent } from "./servicePackage.component";
import { ServicePackageSearchComponent } from "./search/searchServicePackage.component";
import { ServicePackageAddUpdateComponent } from "./addUpdate/addUpdateServicePackage.component";
import { ServicePackageAddUpdateComponentV2 } from './addUpdate.v2/addUpdateServicePackage.component';
import { ServicePackageService } from './services/servicePackage.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,SharedModule,
        RouterModule.forChild(routes)],
    declarations: [
        ServicePackageComponent,
        UploadServicePackageComponent,
        ServicePackageSearchComponent,
        ServicePackageAddUpdateComponentV2,
        ServicePackageAddUpdateComponent
    ],
    providers: [ServicePackageService],
})

export class ServicePackageModule {
    static routes = routes;
}
