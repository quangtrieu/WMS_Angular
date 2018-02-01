import { MessagesService } from './../../commons/message.utils';
import { AppointmentService } from './../appointment/services/appointment.service';
import { ModelVariantService } from './../modelVariant/services/modelVariant.service';
import { VehicleModelService } from './../vehicleModel/services/vehicleModel.service';
import { VehicleMakeService } from './../vehicleMake/services/vehicleMake.service';
import { VehicleService } from './../vehicle/services/vehicle.service';
import { DialogConfirmAddVehicleProfile } from './dialogConfirmAddVehicleProfile/dialogConfirmAddVehicleProfile.component';
import { DialogAddVehicleProfileComponent } from './dialogAddVehicleProfile/dialogAddVehicleProfile.component';
import { DialogAddCustomerComponent } from './dialogAddCustomer/dialogAddCustomer.component';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { ImportComponent } from "./importBtn/import.component";
import { ServiceHistoryAddUpdateComponent } from "./serviceHistory/addUpdateServiceHistory.component";
import { JobLabourAddUpdateComponent } from "./jobLabour/addUpdateJobLabour.component";
import { PartAddUpdateComponent } from "./part/addUpdatePart.component";
import { AddTimeSlotAppointmentComponent } from "./timeSlot/addTimeSlotAppointment.component";
import { AddTimeSlotV2AppointmentComponent } from "./timeSlotV2/addTimeSlotV2Appointment.component";
import { BoardAppointmentComponent } from "./appoinmentBoard/boardAppointment.component";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Select2Module } from 'ng2-select2';

import { CustomerService } from "../customer/services/customer.service";
import { DialogCustomerListComponent } from "./dialogCustomerList/dialogCustomerList.component";
import { TimeSlotSetupService } from "../timeSlotSetup/services/timeSlotSetup.service";
import { ToastyModule } from 'ng2-toasty';
import { JPCBViewComponent } from "./jPCB/view/viewJPCB.component";
import { MessageService } from 'primeng/components/common/messageservice';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import {
    InputTextModule, DataTableModule, ButtonModule, DialogModule,
    CheckboxModule, DataListModule, MenubarModule, GrowlModule, MessagesModule, AutoCompleteModule,
    DropdownModule, PaginatorModule, RadioButtonModule, ConfirmDialogModule, ConfirmationService
} from "primeng/primeng";
import { SpinnerModule } from "primeng/components/spinner/spinner";
import { ServiceHistoryComponent } from "../repairOrder/serviceHistory/serviceHistory.component";
import { ConfirmDeleteComponent } from "./diglogConfirmDelete/confirmDelete.component";

export const PRIMENG_CONTROL = [
    InputTextModule, DataTableModule, ButtonModule, DialogModule, RadioButtonModule,
    CheckboxModule, DataListModule, MenubarModule, GrowlModule, MessagesModule, DropdownModule, AutoCompleteModule,
    PaginatorModule, ConfirmDialogModule, SpinnerModule
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        Ng2Bs3ModalModule,
        Select2Module,
        ToastyModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        PRIMENG_CONTROL
    ],
    exports: [
        CommonModule,
        FormsModule,
        Select2Module,
        ToastyModule,
        TranslateModule,
        PRIMENG_CONTROL,
        MessagesModule,
        ImportComponent,
        DialogConfirmAddVehicleProfile,
        DialogAddVehicleProfileComponent,
        DialogCustomerListComponent,
        DialogAddCustomerComponent,
        ServiceHistoryAddUpdateComponent,
        JobLabourAddUpdateComponent,
        PartAddUpdateComponent,
        AddTimeSlotAppointmentComponent,
        AddTimeSlotV2AppointmentComponent,
        BoardAppointmentComponent,
        JPCBViewComponent,
        ServiceHistoryComponent,
        ConfirmDeleteComponent
    ],
    declarations: [
        ImportComponent,
        DialogConfirmAddVehicleProfile,
        DialogAddVehicleProfileComponent,
        DialogCustomerListComponent,
        DialogAddCustomerComponent,
        ServiceHistoryAddUpdateComponent,
        JobLabourAddUpdateComponent,
        PartAddUpdateComponent,
        AddTimeSlotAppointmentComponent,
        AddTimeSlotV2AppointmentComponent,
        BoardAppointmentComponent,
        JPCBViewComponent,
        ServiceHistoryComponent,
        ConfirmDeleteComponent
    ],
    providers: [
        CustomerService,
        VehicleService,
        VehicleMakeService,
        VehicleModelService,
        ModelVariantService,
        TimeSlotSetupService,
        AppointmentService,
        MessageService,
        MessagesService,
        ConfirmationService,
        TranslateService
    ]
})

export class SharedModule {

}
