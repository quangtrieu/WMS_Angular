import { AutoCompleteUtils } from './../../../commons/autoComplete.utils';
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { VehicleModel } from "../models/vehicleModel.model";
import { VehicleModelService } from "../services/vehicleModel.service";
import { Router } from "@angular/router";
import { VehicleMakeService } from "../../vehicleMake/services/vehicleMake.service";
import { MessagesService } from './../../../commons/message.utils';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Message } from 'primeng/components/common/api';
import { FormGroup } from '@angular/forms';
import { AutoComplete } from "primeng/primeng";
declare var $: any;

@Component({
    selector: "vehicleModel-addUpdate",
    templateUrl: './addUpdateVehicleModel.component.html'
})

export class AddUpdateVehicleModelComponent implements OnInit {

    @Input()
    vehicleModelId: number;
    @Input() vehicleModel: any;
    vehicleMakes: any = [];
    @ViewChild('formVehicleModel') formVehicleModel: FormGroup;
    selectedVehicleMake: any = {};

    @ViewChild('autoCompleteVehicleMake') autoCompleteVehicleMake: AutoComplete;

    constructor(private router: Router,
        private vehicleModelService: VehicleModelService,
        private vehicleMakeService: VehicleMakeService,
        private slimLoadingBarService: SlimLoadingBarService,
        private autoCompleteUtils: AutoCompleteUtils,
        private messagesService: MessagesService) { }

    ngOnInit(): void {
        
        if (this.vehicleModel == null) {
            this.vehicleModel = {};
            this.vehicleModel.status = 1;
        }
        this.messagesService.onInitData.subscribe((vehicleModel: any) => {
            this.formVehicleModel.reset();
            if (vehicleModel && vehicleModel.id) {
                this.vehicleModelService.getById(vehicleModel.id).retry(3).subscribe(result => {
                    this.vehicleModel = result.data;
                    if (this.vehicleModel.VehicleMake)
                             this.vehicleModel.VehicleMake.display = this.vehicleModel.VehicleMake.code + ' - ' + this.vehicleModel.VehicleMake.description;
                    this.vehicleModel.isUpdate = true;
                });
            } else {
                this.vehicleModel = {};
                this.vehicleModel.status = 1;
            }
        });
    }

    filterVehicleMake(isScrolling) {
        var autoComplete = $('p-autoComplete[name=vehicleMake]');
        var currentPage = 1;
        if (!isScrolling) {
            this.autoCompleteUtils.setCurrentPage(autoComplete, currentPage)
        } else {
            currentPage = this.autoCompleteUtils.getCurrentPage(autoComplete);
        }
        var query = autoComplete.find('.ui-autocomplete-input').val();
        this.vehicleMakeService.filterVehicleMakes(currentPage, this.autoCompleteUtils.pageSize, { query: query }).subscribe(result => {

            this.autoCompleteUtils.setPageCount(autoComplete, result.data.count);
            var items = result.data.rows;
            if (!isScrolling) {
                this.vehicleMakes = [];
            }
            this.vehicleMakes = this.vehicleMakes.concat(items);
        });

        this.autoCompleteUtils.loadMore(autoComplete, () => {
            this.filterVehicleMake(true);
        });
    }

    onVehicleMakeSelect(){
        /* Fix: click two times to close the panels */
        this.autoCompleteVehicleMake.hide();
    }

    hasProcess = 0;
    isValidCode = true;
    isProcessing = false;
    onKeyPressCode() {
        
        var code = this.vehicleModel.code;
        if (code && code.length >= 3) {
            this.isProcessing = true;
            this.slimLoadingBarService.start(() => { });
            this.vehicleModelService.checkExistCode(this.vehicleModel).retry(3).subscribe(result => {
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
    addUpdate(vehicleModel) {
        this.slimLoadingBarService.start(() => { });
        if (vehicleModel.id) {
            this.vehicleModelService.update(vehicleModel).retry(3).subscribe(result => {
                if (!result.success) {
                    this.messagesService.error(result.message);
                    this.vehicleModelId = 0;
                   
                    return;
                }
                this.messagesService.success(result.message);
                this.vehicleModelId = 0;
               
                this.navigatorToSearch();
            });
        } else {

            this.vehicleModelService.add(vehicleModel).retry(3).subscribe(result => {
                if (!result.success) {
                    this.messagesService.error(result.message);
                    this.vehicleModelId = 0;
                    
                    return;
                }
                this.messagesService.success(result.message);
                this.vehicleModelId = 0;
            
                this.navigatorToSearch();
            });
        }
    }

    navigatorToSearch() {
       
        this.vehicleModel = {};
        this.vehicleModel.status = 1;
        this.slimLoadingBarService.complete();
        $('#add-update-vehicle-model-modal').modal('hide');
        this.messagesService.reloadMainComponent(true); // reload data for main component
        this.router.navigateByUrl('/vehicleModel/Search');
    }
}