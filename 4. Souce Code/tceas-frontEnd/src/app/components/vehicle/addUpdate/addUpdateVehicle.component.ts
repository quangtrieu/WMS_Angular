import { ModelVariantService } from './../../modelVariant/services/modelVariant.service';
import { VehicleModelService } from './../../vehicleModel/services/vehicleModel.service';
import { VehicleMakeService } from './../../vehicleMake/services/vehicleMake.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { VehicleService } from './../services/vehicle.service';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from './../../../config/app.constant';
import { Utils } from './../../../commons/app.utils';
import { AutoCompleteUtils } from './../../../commons/autoComplete.utils';
import { AutoComplete } from "primeng/primeng";

declare var $: any;

@Component({
    selector: "vehicle-addUpdate",
    templateUrl: './addUpdateVehicle.component.html',
    styleUrls: ['./addUpdateVehicle.style.css']
})

export class VehicleAddUpdateComponent implements OnInit, OnDestroy {

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private sub: any;
    vehicle: any;
    customer: any;

    private isExistVinNo: boolean = false;
    private isExistRegistrationNo: boolean = false;
    private vehicleMakeList: any[];
    private vehicleModelList: any[];
    private modelVariantList: any[];
    @ViewChild('autoCompleteVehicleMake') autoCompleteVehicleMake: AutoComplete;
    @ViewChild('autoCompleteVehicleModel') autoCompleteVehicleModel: AutoComplete;
    @ViewChild('autoCompleteVehicleVariant') autoCompleteVehicleVariant: AutoComplete;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private Utils: Utils,
        private autoCompleteUtils: AutoCompleteUtils,
        private vehicleService: VehicleService,
        private slimLoadingBarService: SlimLoadingBarService,
        private vehicleMakeService: VehicleMakeService,
        private vehicleModelService: VehicleModelService,
        private constant: Constants,
        private modelVariantService: ModelVariantService) { }

    ngOnInit(): void {
        this.vehicle = {};
        this.customer = {};
        this.sub = this.route.params.subscribe(params => {
            this.vehicle.id = +params['id'];
        });

        if (this.vehicle.id) {
            this.vehicleService
                .getVehicle(this.vehicle.id)
                .retry(3)
                .subscribe(result => {
                    if (result.success)
                        this.bindVehicleCustomerData(result);
                });
        }

        //this.bindVehicleMakeData();
    }

    bindVehicleCustomerData(objData: any): void {
        if (objData.data) {
            this.vehicle = objData.data;
            this.customer = objData.data.Customer;

            // bind data
            this.vehicle.engineNo = this.vehicle.Vehicle.engineNo;
            this.vehicle.vinNo = this.vehicle.Vehicle.vinNo;
            this.vehicle.chassisNo = this.vehicle.Vehicle.chassisNo;
            this.vehicle.registrationDate = this.Utils.getDateFromDateTime(this.vehicle.Vehicle.registrationDate);
            this.vehicle.purchaseDate = this.Utils.getDateFromDateTime(this.vehicle.Vehicle.purchaseDate);
            this.vehicle.niscareOrRenCare = this.vehicle.Vehicle.niscareOrRenCare;
            this.vehicle.npmp = this.vehicle.Vehicle.npmp;
            this.vehicle.status = this.vehicle.Vehicle.status;

            this.vehicle.id = this.vehicle.Vehicle.id;
            this.vehicle.vehicleMakeId = this.vehicle.Vehicle.VehicleVariant.VehicleModel.vehicleMakeId;
            this.vehicle.vehicleModelId = this.vehicle.Vehicle.VehicleVariant.vehicleModelId;
            this.vehicle.vehicleVariantId = this.vehicle.Vehicle.vehicleVariantId;

            //this.onChangeVehicleMake();
            //this.onChangeVehicleModel();
        }
    }

    // bindVehicleMakeData(): void {
    //     this.vehicleMakeService
    //         .getVehicleMakes(1, 1000, null, null)
    //         .retry(3)
    //         .subscribe(result => {
    //             this.vehicleMakeList = [];
    //             if (result != null && result.data != null) {
    //                 console.log('vehicleMakeList:', result.data);
    //                 this.vehicleMakeList = result.data.rows.map(c => ({ label: c.code + " - " + c.description, value: c }));
    //                 //this.vehicleMakeList.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
    //                 this.slimLoadingBarService.complete();

    //             }
    //         }
    //         );
    // }

    onVehicleVariantSelect() {
        /* Fix: click two times to close the panels */
        this.autoCompleteVehicleVariant.hide();
    }

    public filterVehicleMake(isScrolling) {

        var autoComplete = $('p-autoComplete[name=vehicleMake]');
        var currentPage = 1;
        if (!isScrolling) {
            this.autoCompleteUtils.setCurrentPage(autoComplete, currentPage)
        } else {
            currentPage = this.autoCompleteUtils.getCurrentPage(autoComplete);
        }
        let query = autoComplete.find('.ui-autocomplete-input').val();
        this.vehicleMakeService.filterVehicleMakes(currentPage, this.autoCompleteUtils.pageSize, { query: query }).subscribe((result) => {

            this.autoCompleteUtils.setPageCount(autoComplete, result.data.count);
            let items = result.data.rows;
            if (!isScrolling) {
                this.vehicleMakeList = [];
            }
            this.vehicleMakeList = this.vehicleMakeList.concat(items);
        });

        this.autoCompleteUtils.loadMore(autoComplete, () => {
            this.filterVehicleMake(true);
        });
    }

    public filterVehicleModel(isScrolling) {
        this.autoCompleteVehicleMake.hide();

        var autoCompleteModel = $('p-autoComplete[name=vehicleModel]');
        var currentPage = 1;
        if (!isScrolling) {
            this.autoCompleteUtils.setCurrentPage(autoCompleteModel, currentPage);
        } else {
            currentPage = this.autoCompleteUtils.getCurrentPage(autoCompleteModel);
        }
        let query = autoCompleteModel.find('.ui-autocomplete-input').val();
        this.vehicleModelService.filterVehicleModels(currentPage, this.autoCompleteUtils.pageSize, { query: query, vehicleMake: this.vehicle.vehicleMake }).subscribe((result) => {
            if (result != null && result.data != null && result.data.rows != null) {
                this.autoCompleteUtils.setPageCount(autoCompleteModel, result.data.count);
                let items = result.data.rows;
                if (!isScrolling) {
                    this.vehicleModelList = [];
                }
                this.vehicleModelList = this.vehicleModelList.concat(items);
            }

        });

        this.autoCompleteUtils.loadMore(autoCompleteModel, () => {
            this.filterVehicleModel(true);
        });
    }

    public filterVehicleVariant(isScrolling) {
        //this.autoCompleteVehicleMake.hide();
        this.autoCompleteVehicleModel.hide();
        var autoCompleteVariant = $('p-autoComplete[name=vehicleVariant]');
        var currentPage = 1;
        if (!isScrolling) {
            this.autoCompleteUtils.setCurrentPage(autoCompleteVariant, currentPage);
        } else {
            currentPage = this.autoCompleteUtils.getCurrentPage(autoCompleteVariant);
        }
        let query = autoCompleteVariant.find('.ui-autocomplete-input').val();
        this.modelVariantService.filterVehicleVariants(currentPage, this.autoCompleteUtils.pageSize, { query: query, vehicleModel: this.vehicle.vehicleModel }).subscribe((result) => {
            if (result != null && result.data != null && result.data.rows != null) {
                this.autoCompleteUtils.setPageCount(autoCompleteVariant, result.data.count);
                let items = result.data.rows;
                if (!isScrolling) {
                    this.modelVariantList = [];
                }
                this.modelVariantList = this.modelVariantList.concat(items);
            }

        });

        this.autoCompleteUtils.loadMore(autoCompleteVariant, () => {
            this.filterVehicleVariant(true);
        });
    }


    // public onChangeVehicleMake(): void {
    //     this.bindVehicleModelData();
    // }

    // bindVehicleModelData(): void {
    //     this.vehicleModelService
    //         .getByVehicleMakeId(this.vehicle.vehicleMakeId)
    //         .retry(3)
    //         .subscribe(result => {
    //             if (result != null && result.data != null && result.data.rows != null) {
    //                 this.vehicleModelList = result.data.rows;
    //             }
    //         }
    //         );
    // }

    // public onChangeVehicleModel(): void {
    //     this.bindModelVariantData();
    // }

    // bindModelVariantData(): void {
    //     this.modelVariantService
    //         .getByVehicleModelId(this.vehicle.vehicleModelId)
    //         .retry(3)
    //         .subscribe(result => {
    //             if (result != null && result.data != null && result.data.rows != null) {
    //                 this.modelVariantList = result.data.rows;
    //             }
    //         }
    //         );
    // }

    onShowAddCustomerDialog() {
        $('#dialogCustomerList-modal').modal('show');
    }

    bindCustomer(customer) {

        $('#dialogVehicleProfileAdd-modal').modal('show');

        if (customer) {
            // bind customer data
            let customerInfo = customer.split("_");
            this.customer.id = customerInfo[0];
            this.customer.name = customerInfo[1];
            this.customer.idNumber = customerInfo[2];
            this.customer.contact = customerInfo[3] == "undefined" ? "" : customerInfo[3];
        }

    }

    addUpdate(form: any) {
        form._submitted = true;
        if (form.valid && !this.isValidRegistration && !this.isExistVinNo) {
            this.slimLoadingBarService.start(() => { });

            this.customer.code = "123456";
            this.customer.customerType = 1;
            this.vehicle.customer = this.customer;
            if (this.vehicle.id) {
                this.vehicleService
                    .updateVehicle(this.vehicle)
                    .retry(3)
                    .subscribe(result => {
                        if (result.success)
                            this.onCompleted();
                    });
            } else {
                this.vehicleService
                    .addVehicle(this.vehicle)
                    .retry(3)
                    .subscribe(result => {
                        console.log(result);
                        if (result.success)
                            this.onCompleted();
                    });
            }
        }
    }

    onCompleted() {
        this.slimLoadingBarService.complete();
        this.router.navigate(['/vehicle/Search']);
    }

    public checkExistVinNo(event: any) {
        if (event.keyCode == 13) {

            let objCheckVinNo: any = {};
            objCheckVinNo.vinNo = this.vehicle.vinNo;
            objCheckVinNo.variantId = this.vehicle.vehicleVariantId;

            this.vehicleService
                .checkVinNo(objCheckVinNo)
                .retry(3)
                .subscribe(result => {
                    if (result.success && result.data)
                        this.isExistVinNo = true;
                    else
                        this.isExistVinNo = false;
                });
        }

    }

    // public checkExistRegistrationNo(event: any) {
    //     if (event.keyCode == 13) {

    //         let objCheckRegistrationNo: any = {};
    //         objCheckRegistrationNo.registrationNo = this.vehicle.registrationNo;

    //         this.vehicleService
    //         .checkRegistrationNo(objCheckRegistrationNo)
    //         .retry(3)
    //         .subscribe(result => {
    //             if(result.success && result.data)
    //                 this.isExistRegistrationNo = true;
    //             else 
    //                 this.isExistRegistrationNo = false;
    //         });
    //     }

    // }

    hasProcess = 0;
    isValidRegistration = true;
    isProcessing = false;
    checkExistRegistrationNo() {
        var registrationNo = this.vehicle.registrationNo;
        if (registrationNo && registrationNo.length >= 1) {
            this.isProcessing = true;
            this.slimLoadingBarService.start(() => { });
            this.vehicleService.checkRegistrationNo(this.vehicle).retry(3).subscribe(result => {
                //if registration is not exist
                if (!result.data) {
                    this.isValidRegistration = true;
                    this.hasProcess++
                } else {
                    this.isValidRegistration = false;
                }
                this.isProcessing = false;
                this.slimLoadingBarService.complete();
            });
        }
    }
    isValidChassisNo = true;
    isProcessingCheck = false;
    checkChassisNo() {
        debugger;
        var chassisNo = this.vehicle.chassisNo;
        if (chassisNo && chassisNo.length >= 1) {
            //this.vehicle = {};
            var registrationBack = this.vehicle.registrationNo;
            this.isProcessingCheck = true;
            this.slimLoadingBarService.start(() => { });
            this.vehicleService.getInfoVehicleByChassisNo(chassisNo).retry(3).subscribe(result => {
                debugger;
                if (result != null) {
                    this.vehicle = {};
                    this.vehicle = result.data;
                    this.vehicle.vehicleMake = {};
                    this.vehicle.vehicleModel = {};
                    this.vehicle.vehicleVariant = {};
                    this.isValidChassisNo = false;
                    this.vehicle.registrationNo = registrationBack;
                    this.vehicle.vehicleMake.display = result.data.VehicleVariant.VehicleModel.VehicleMake.code + ' - ' + result.data.VehicleVariant.VehicleModel.VehicleMake.description;
                    this.vehicle.vehicleModel.display = result.data.VehicleVariant.VehicleModel.code + ' - ' + result.data.VehicleVariant.VehicleModel.description;
                    this.vehicle.vehicleVariant.display = result.data.VehicleVariant.description;
                    console.log('result: ', result.data);

                } else {
                    this.isValidChassisNo = true;
                }
                this.isProcessingCheck = false;
                this.slimLoadingBarService.complete();
            });
        }
    }
}