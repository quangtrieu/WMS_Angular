import { FormGroup } from '@angular/forms';
import { MessagesService } from './../../../commons/message.utils';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { VehicleMakeService } from "../services/vehicleMake.service";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

declare var $: any;
@Component({
    selector: "vehicleMake-addUpdate",
    templateUrl: './addUpdateVehicleMake.component.html'
})

export class VehicleMakeAddUpdateComponent implements OnInit {
    constructor(
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private router: Router,
        private route: ActivatedRoute,
        private vehicleMakeService: VehicleMakeService,
        private messagesService: MessagesService,
        private slimLoadingBarService: SlimLoadingBarService) {
    }

    id: number;
    private sub: any;
    @Input() vehicleMake: any;
    @ViewChild('frmVehicleMake') frmVehicleMake: FormGroup;

    ngOnInit(): void {
        if (this.vehicleMake == null) {
            this.vehicleMake = {};
            this.vehicleMake.status = 1;
        }

        this.messagesService.onInitData.subscribe((vehicleMake: any) => {
            this.frmVehicleMake.reset();
            if (vehicleMake && vehicleMake.id) {
                this.vehicleMakeService.getById(vehicleMake.id).retry(3).subscribe(result => {
                    this.vehicleMake = result.data;
                    this.vehicleMake.isUpdate = true;
                });
            } else {
                this.vehicleMake = {};
                this.vehicleMake.status = 1;
            }
        });
    }

    hasProcess = 0;
    isValidCode = true;
    isProcessing = false;
    onKeyPressCode() {
        var code = this.vehicleMake.code;
        if (code && code.length >= 1) {
            this.isProcessing = true;
            this.slimLoadingBarService.start(() => { });
            this.vehicleMakeService.checkExistCode(this.vehicleMake).retry(3).subscribe(result => {
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

    addUpdate(vehicleMake) {
        this.slimLoadingBarService.start(() => { });
        if (vehicleMake.id) {
            this.vehicleMakeService.updateVehicleMake(vehicleMake).retry(3).subscribe(result => {
                if (!result.success) {
                    this.messagesService.error(result.message);
                    return;
                }
                this.messagesService.success(result.message);
                this.navigatorToSearch();
            });
        } else {
            this.vehicleMakeService.addVehicleMake(vehicleMake).retry(3).subscribe(result => {
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
        this.vehicleMake = {};
        this.vehicleMake.status = 1;

        this.slimLoadingBarService.complete();
        $('#addUpdate-VehicleMake-modal').modal('hide');
        this.messagesService.reloadMainComponent(true); // reload data for main component
        this.router.navigateByUrl('/vehicleMake/Search');
    }
}