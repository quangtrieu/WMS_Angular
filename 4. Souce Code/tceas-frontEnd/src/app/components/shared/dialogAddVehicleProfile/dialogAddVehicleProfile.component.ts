import { ModelVariantService } from './../../modelVariant/services/modelVariant.service';
import { VehicleModelService } from './../../vehicleModel/services/vehicleModel.service';
import { VehicleMakeService } from './../../vehicleMake/services/vehicleMake.service';
import { VehicleService } from './../../vehicle/services/vehicle.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DetailCustomerAddUpdateComponent } from './../dialogAddCustomer/addUpdateDetailCustomer.component';
import { Component, OnInit, Input, ViewChild, ComponentRef, Output, EventEmitter } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { AppState } from "../../../app.service";

declare const $: any;

@Component({
    selector: "newvp-addUpdate",
    templateUrl: './dialogAddVehicleProfile.component.html',
    styleUrls: ['./dialogAddVehicleProfile.style.css']
})

export class DialogAddVehicleProfileComponent implements OnInit {

    @Output() bindNewVehicleProfile: EventEmitter<string> = new EventEmitter<string>();

    constructor(public appState: AppState, private constant: Constants,
        private vehicleService: VehicleService, private vehicleMakeService: VehicleMakeService,
        private vehicleModelService: VehicleModelService, private modelVariantService: ModelVariantService) { }

    vehicleProfile: any;
    customer: any;
    private vehicleMakeList: any[];
    private vehicleModelList: any[];
    private modelVariantList: any[];

    ngOnInit(): void {
        this.vehicleProfile = {};
        this.customer = {};

        $('#dialogVehicleProfileAdd-modal').on('shown.bs.modal', () => {
            if(!this.vehicleMakeList) 
                this.bindVehicleMakeData();
        });
    }

    bindVehicleMakeData(): void {
        this.vehicleMakeService
            .getVehicleMakes(1, 1000, null, null)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.vehicleMakeList = result.data.rows;

                }
            }
            );
    }

    public onChangeVehicleMake(): void {
        this.bindVehicleModelData();
    }

    bindVehicleModelData(): void {
        this.vehicleModelService
            .getByVehicleMakeId(this.vehicleProfile.vehicleMakeId)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.vehicleModelList = result.data.rows;
                }
            }
            );
    }

    public onChangeVehicleModel(): void {
        this.bindModelVariantData();
    }

    bindModelVariantData(): void {
        this.modelVariantService
            .getByVehicleModelId(this.vehicleProfile.vehicleModelId)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.modelVariantList = result.data.rows;
                }
            }
            );
    }

    bindCustomer(customer) {

        $('#dialogVehicleProfileAdd-modal').modal('show');

        if (customer) {
            // bind customer data
            let customerInfo = customer.split("_");

            this.customer.id = customerInfo[0];
            this.customer.name = customerInfo[1]
        }

    }

    closeAddVehicle(f: any) {
        f.reset();
    }

    closeDialog(isAddCustomer) {
        if(($('#dialogVehicleProfileAdd-modal').data('bs.modal') || {}).isShown) {
            this.resetForm();
        } else {
            if(isAddCustomer) {
                $('#dialogCustomerList-modal').modal('show');
                $('#dialogCustomerAdd-modal').modal('hide');
            } else {
                $('#dialogVehicleProfileAdd-modal').modal('show');
                $('#dialogCustomerList-modal').modal('hide');
            }
        }
    }

    onAddVP(form: any) {
        form._submitted = true;
        this.vehicleProfile.customer = this.customer;
        if (form.valid) {
            this.vehicleService
                .addVehicle(this.vehicleProfile)
                .retry(3)
                .subscribe(result => {
                    if (result.success) {
                        let newVehicle = this.vehicleProfile.registrationNo + "_" + this.vehicleProfile.vinNo;
                        this.bindNewVehicleProfile.emit(newVehicle);
                        $('#dialogVehicleProfileAdd-modal').modal('hide');
                    }
                });
        }
    }

    onClick() {
        $('#dialogCustomerList-modal').modal('show');
        $('#dialogVehicleProfileAdd-modal').modal('hide');
    }

    private resetForm(): void {
        this.vehicleProfile = {};
    }

}