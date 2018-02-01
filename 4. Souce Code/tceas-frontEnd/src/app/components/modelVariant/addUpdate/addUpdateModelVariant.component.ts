import { VehicleModelService } from './../../vehicleModel/services/vehicleModel.service';
import { ModelVariantService } from './../services/modelVariant.service';
import { VehicleMakeService } from './../../vehicleMake/services/vehicleMake.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AutoCompleteUtils } from './../../../commons/autoComplete.utils';
import { Router } from '@angular/router';
import { MessagesService } from './../../../commons/message.utils';
import { FormGroup } from '@angular/forms';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { AutoComplete } from "primeng/primeng";
declare var $: any;

@Component({
    selector: 'modelVariant-addUpdate',
    templateUrl: './addUpdateModelVariant.component.html'
})

export class AddUpdateModelVariantComponent implements OnInit {
    // tslint:disable-next-line:member-access
    @Input() modelVariant: any;
    private vehicleMakes: any = [];
    private vehicleModels: any = [];
    @ViewChild('formModelVariant') formModelVariant: FormGroup;
    @ViewChild('autoCompleteVariantVehicleMake') autoCompleteVariantVehicleMake: AutoComplete;
    @ViewChild('autoCompleteVariantVehicleModel') autoCompleteVariantVehicleModel: AutoComplete;

    constructor(private router: Router,
        public modelVariantService: ModelVariantService,
        private vehicleMakeService: VehicleMakeService,
        private autoCompleteUtils: AutoCompleteUtils,
        private messagesService: MessagesService,
        private slimLoadingBarService: SlimLoadingBarService,
        private vehicleModelService: VehicleModelService) { }

    public ngOnInit(): void {
        if (this.modelVariant == null) {
            this.modelVariant = {};
        }
        this.vehicleMakes = [];
        this.vehicleModels = [];
        this.messagesService.onInitData.subscribe((modelVariant: any) => {
             this.formModelVariant.reset();
            if (modelVariant && modelVariant.id) {
                this.modelVariantService.getById(modelVariant.id).retry(3).subscribe(result => {
                    if (result && result.data) {
                        this.modelVariant = result.data;
                        if (this.modelVariant) {
                            this.modelVariant.vehicleModel = {};
                            this.modelVariant.vehicleMake = {};

                            this.modelVariant.vehicleModel.display = this.modelVariant.VehicleModel.code + ' - ' + this.modelVariant.VehicleModel.description;
                            this.modelVariant.vehicleModel.id = this.modelVariant.VehicleModel.id;
                            if (this.modelVariant.VehicleModel && this.modelVariant.VehicleModel.VehicleMake) {
                                this.modelVariant.vehicleMake.display = this.modelVariant.VehicleModel.VehicleMake.code + ' - ' + this.modelVariant.VehicleModel.VehicleMake.description;
                                this.modelVariant.vehicleMake.id = this.modelVariant.VehicleModel.VehicleMake.id;
                            }
                        }
                        this.modelVariant.isUpdate = true;
                    }
                });
            } else {
                
                this.modelVariant = {};
                this.modelVariant.status = 1;
            }
        });
    }


    onVehicleModelSelect(){
        /* Fix: click two times to close the panels */
        this.autoCompleteVariantVehicleModel.hide();
    }

    hasProcess = 0;
    isValidCode = true;
    isProcessing = false;
    onKeyPressCode() {
        var code = this.modelVariant.code;
        if (code && code.length >= 1) {
            this.isProcessing = true;
            this.slimLoadingBarService.start(() => { });
            this.modelVariantService.checkExistCode(this.modelVariant).retry(3).subscribe(result => {
                if (!result.data) {
                    this.isValidCode = true;
                    this.hasProcess++
                } else {
                    this.isValidCode = false;
                }
                this.isProcessing = false;
                this.slimLoadingBarService.complete();
            });
        }
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
                this.vehicleMakes = [];
            }
            this.vehicleMakes = this.vehicleMakes.concat(items);
        });

        this.autoCompleteUtils.loadMore(autoComplete, () => {
            this.filterVehicleMake(true);
        });
    }

    // tslint:disable-next-line:member-ordering
    public filterVehicleModel(isScrolling) {
        this.autoCompleteVariantVehicleMake.hide();
        var autoCompleteModel = $('p-autoComplete[name=vehicleModel]');
        var currentPage = 1;
        if (!isScrolling) {
            this.autoCompleteUtils.setCurrentPage(autoCompleteModel, currentPage);
        } else {
            currentPage = this.autoCompleteUtils.getCurrentPage(autoCompleteModel);
        }
        let query = autoCompleteModel.find('.ui-autocomplete-input').val();
        this.vehicleModelService.filterVehicleModels(currentPage, this.autoCompleteUtils.pageSize, { query: query, vehicleMake: this.modelVariant.vehicleMake }).subscribe((result) => {
            if (result != null && result.data != null && result.data.rows != null) {
                this.autoCompleteUtils.setPageCount(autoCompleteModel, result.data.count);
                let items = result.data.rows;
                if (!isScrolling) {
                    this.vehicleModels = [];
                }
                this.vehicleModels = this.vehicleModels.concat(items);
            }

        });

        this.autoCompleteUtils.loadMore(autoCompleteModel, () => {
            this.filterVehicleModel(true);
        });
    }


    addUpdate(modelVariant) {
        this.slimLoadingBarService.start(() => { });
        if (modelVariant.id) {
            this.modelVariantService.update(modelVariant).retry(3).subscribe(result => {
               
                if (!result.success) {
                    this.messagesService.error(result.message);
                    return;
                }
                this.messagesService.success(result.message);
                this.navigatorToSearch();
            });
        } else {
            this.modelVariantService.add(modelVariant).retry(3).subscribe(result => {
                if (!result.success) {
                    this.messagesService.error(result.message);
                    return;
                }
                this.messagesService.success(result.message)
                this.navigatorToSearch();
            });
        }
    }

    navigatorToSearch() {
        this.modelVariant = {};
        //this.formModelVariant.reset();
        this.modelVariant.status = 1;

        this.slimLoadingBarService.complete();
        $('#add-update-model-variant-modal').modal('hide');
        this.messagesService.reloadMainComponent(true); // reload data for main component
        this.router.navigateByUrl('/modelVariant/Search');
    }

    public changeVehicleMake(id: number) {
        this.vehicleModelService.getByVehicleMakeId(id).subscribe((result) => {
            this.vehicleModels = result.data.rows;
        });
    }
}
