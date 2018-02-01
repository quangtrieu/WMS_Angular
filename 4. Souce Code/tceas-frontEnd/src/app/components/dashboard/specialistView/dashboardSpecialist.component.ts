import { TranslateService } from '@ngx-translate/core';
import { Utils } from './../../../commons/app.utils';
import { VehicleService } from './../../vehicle/services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { TimeSlot } from "../../shared/models/timeSlot.model";
import { DummyData } from "../../../../dummydata/dummydata";

declare var $: any;

@Component({
    selector: 'dashboard-specialist',
    templateUrl: './dashboardSpecialist.component.html',
    styleUrls: ['./../dashboard.style.css']
})

export class DashboardSpecialistComponent implements OnInit {

    timeSlot: TimeSlot;
    vehicle: any;
    vehicleProfile: any;
    dummyData: DummyData;

    constructor(private vehicleService: VehicleService,
        private Utils: Utils) {
        this.dummyData = new DummyData();
    }

    ngOnInit(): void {
        this.vehicle = {};
        this.vehicleProfile = {};
        this.vehicleProfile.Customer = {};
        this.vehicleProfile.Vehicle = {};

        $('.dashboard-appointment table').dataTable({
            searching: false,
            ordering: false,
            lengthChange: false,
            paging: false,
            info: false
        });

        $('.dashboard-service-history table').dataTable({
            searching: false,
            ordering: false,
            lengthChange: false,
            paging: false,
            info: false,
            autoWidth: false
        });
    }

    onSearchReceiveing() {
        if (this.vehicle.registrationNo || this.vehicle.vinNo) {
            this.vehicleService
                .getVehicleByRegisterNoVinNo(this.vehicle)
                .retry(3)
                .subscribe(result => {
                    if (result.success && result.data) {

                        // bind vehicle profile data
                        this.vehicleProfile.registrationNo = result.data.registrationNo;
                        this.vehicleProfile.Vehicle.vehicleId = result.data.Vehicle.id;
                        this.vehicleProfile.Vehicle.VehicleMake = result.data.Vehicle.VehicleVariant.VehicleModel.VehicleMake.description;
                        this.vehicleProfile.Vehicle.VehicleModel = result.data.Vehicle.VehicleVariant.VehicleModel.description;
                        this.vehicleProfile.Vehicle.VehicleVariant = result.data.Vehicle.VehicleVariant.description;

                        this.vehicleProfile.Customer = result.data.Customer;
                        $('.vehicle-registration-result').removeClass('hide');
                    }

                });
        } else {
            //$('.vehicle-registration-result').addClass('hide'); // Hide
            $('#dialogCofirmVehicleProfileAdd-modal').modal('show');
        }

    }

    bindNewVehicleProfile(vehicle): void {
        if (vehicle) {
            let registrationNo = vehicle.substr(0, vehicle.indexOf("_"));
            let vinNo = vehicle.substr(vehicle.indexOf("_") + 1, vehicle.length - vehicle.indexOf("_") - 1);
            this.vehicle.registrationNo = (registrationNo == null) ? "" : registrationNo;
            this.vehicle.vinNo = (vinNo == null) ? "" : vinNo;
            this.onSearchReceiveing();
        }
    }

    // searchVehicleRegistrationNo(){
    //    var vehicleRegNo = $('#vehicle-registration-no-search').val();
    //    if(vehicleRegNo == this.dummyData.vehicle.vehicleRegistrationNo){
    //        $('.vehicle-registration-result').removeClass('hide'); // Show
    //    }
    //    else{
    //        $('.vehicle-registration-result').addClass('hide'); // Hide
    //        $('#dialogCofirmVehicleProfileAdd-modal').modal('show');
    //    }
    // }

    openAddTimeSlotAppoimentModal() {
        this.timeSlot = new TimeSlot();
        this.timeSlot.from = 1;

        $('#addTimeSlotAppointment-modal').modal('show');
    }

    openServiceHistoryModal() {
        $('#serviceHistory-modal').modal('show');
    }

}