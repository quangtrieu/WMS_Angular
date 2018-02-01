import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routes } from './resourceAllocation.routes'
import { ResourceAllocationComponent } from "./resourceAllocation.component";
import { SearchRAComponent } from "./search/searchRA.component";
import { AssignMechanicRAComponent } from "./assign/assignMechanicRA.component";
import { AssignMechanicRADialogComponent } from "./dialogAssignMechanicRA/assignMechanicRADialog.component";
import { TaskDetailRADialogComponent } from "./dialogTaskDetail/taskDetailRADialog.component";


@NgModule({
    imports: [
        CommonModule, FormsModule,
        RouterModule.forChild(routes)],
    declarations: [
        ResourceAllocationComponent,
        SearchRAComponent,
        AssignMechanicRAComponent,
        AssignMechanicRADialogComponent,
        TaskDetailRADialogComponent
    ],
    providers: [],
})

export class ResourceAllocationModule {
    static routes = routes;
}
