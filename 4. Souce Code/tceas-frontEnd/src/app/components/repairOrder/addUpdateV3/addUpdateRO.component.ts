import { Message } from 'primeng/primeng';
import { MessagesService } from './../../../commons/message.utils';
import { ApiModelResponse } from './../../../commons/app.http.service';
import { Observable } from 'rxjs/Observable';
import { JobFulfilmentModel } from './../../jobFulfilment/models/jobFulfilment.model';
import { JobFulfilmentService } from './../../jobFulfilment/services/jobFulfilment.service';
import { JobPartService } from './../../shared/services/jobPart.service';
import { JobItem } from './../models/repairOrder.item.model';
import { VehicleCustomerService } from './../../shared/services/vehicleCustomer.service';
import { RepairOrderService } from './../services/repairOrder.service';
import { ServicePackageService } from './../../servicePackage/services/servicePackage.service';
import { PartMasterService } from './../../partMaster/services/partMaster.service';
import { JobCodeService } from './../../jobCode/services/jobCode.service';
import { JobCodeAddUpdateComponent } from './../../jobCode/addUpdate/addUpdateJobCode.component';
import { JobGroupService } from './../../jobGroup/services/jobGroup.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms/forms";
import { JobSectionService } from "../../jobSection/services/jobSection.service";
import { Select2OptionData } from 'ng2-select2';
import { RepairOrderItem } from '../models/repairOrder.item.model';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

declare var $: any;
@Component({
    selector: "RO-addUpdate",
    templateUrl: './addUpdateRO.component.html',
    styleUrls: ['./addUpdateRO.style.css'],
    providers: [JobGroupService, JobCodeService, JobSectionService, PartMasterService, ServicePackageService, VehicleCustomerService,
        JobPartService, JobFulfilmentService]
})

export class ROAddUpdateV3Component implements OnInit {
    id: number = null;
    repairOrder: any;
    private sub: any;
    isProcessing = false;
    pageSizeEntitlement: Array<any>;
    selectedPageSizeEntitlement: any;
    pageSizePart: Array<any>;
    selectedPageSizePart: any;
    partSelected: any;
    selected: any;
    repairOrderBay: any;
    private msgs: Message[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private repairOrderService: RepairOrderService,
        private jobGroupService: JobGroupService,
        private jobCodeService: JobCodeService,
        private jobSectionService: JobSectionService,
        private partMasterService: PartMasterService,
        private jobPartService: JobPartService,
        private servicePackageService: ServicePackageService,
        private vehicleCustomerService: VehicleCustomerService,
        private slimLoadingBarService: SlimLoadingBarService,
        private jobFulfilmentService: JobFulfilmentService,
        private messagesService: MessagesService,
    ) {
        this.msgs = [];
    }

    ngOnInit(): void {
        this.repairOrder = {};
        this.repairOrder.isUpdate = false;
        this.repairOrder.isCustomerWaiting = 1;
        this.repairOrder.dateTimeIn = new Date();
        this.repairOrder.expectedDeliveryDateTime = new Date();
        this.repairOrder.totalLabourCharge = 0;
        this.repairOrder.totalPartAmt = 0;

        this.sub = this.route.params.subscribe(params => {
            this.id = (params['id'] != undefined) ? params['id'] : null;
        });

        if (this.id != null) {
            this.bindRepairOrderById(this.id);
        } else {
            this.loadJobGroupDropdowlist();
            this.loadComebackJobDropdowlist();
            this.loadDropdownPageSize();
            this.loadJobSourceDropdowlist();
            this.loadPartTypeDropdowlist();
            this.loadPaymentTypeDropdowlist()
        }

        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });
    }

    bindNewVehicleProfile(vehicle): void {
        if (vehicle) {
            let registrationNo = vehicle.substr(0, vehicle.indexOf("_"));
            this.repairOrder.vehicleRegistrationNo = registrationNo;
            this.bindInformationByRegistrationNo(registrationNo);
        }
    }

    bindRepairOrderById(id) {
        this.slimLoadingBarService.start(() => { });
        Observable.forkJoin(
            this.repairOrderService.getAllComeBackJob().map((res: any) => res),
            this.repairOrderService.getAllJobSource().map((res: any) => res),
            this.repairOrderService.getAllPartType().map((res: any) => res),
            this.repairOrderService.getAllPaymentType().map((res: any) => res),
            this.repairOrderService.getFullRepairOrderById(this.id).map((res: any) => res)
        ).subscribe(data => {
            this.jobTypeObjects = [];
            this.jobSourceObjects = [];
            this.partTypeObjects = [];
            this.paymentTypeObjects = [];

            this.jobTypeObjects = data[0].success ? data[0].data : [];
            this.jobSourceObjects = data[1].success ? data[1].data : [];
            this.partTypeObjects = data[2].success ? data[2].data : [];
            this.paymentTypeObjects = data[3].success ? data[3].data : [];

            if (data[4] && data[4].success) {
                this.repairOrder = data[4].data;
                this.repairOrder.isUpdate = true;

                var vehicleCustomer = this.repairOrder.VehicleCustomer;
                var repairOrderJob = this.repairOrder.RepairOrderJobs;
                if (vehicleCustomer) {
                    this.setVehicleCustomer(vehicleCustomer);
                }
                if (repairOrderJob) {
                    this.setDataForGrid(repairOrderJob);
                }
                this.slimLoadingBarService.complete();
            }
        });
    }

    setDataForGrid(repairOrderJobs) {
        if (repairOrderJobs) {
            var resultJobType = $.extend(true, [], this.jobTypeObjects);
            var resultJobSource = $.extend(true, [], this.jobSourceObjects);
            var resultPartType = $.extend(true, [], this.partTypeObjects);
            var resultPaymentType = $.extend(true, [], this.paymentTypeObjects);

            repairOrderJobs.forEach(item => {
                var rowItem = new RepairOrderItem();

                rowItem.job = (item.JobMaster) ? item.JobMaster : {};
                rowItem.job.labourCharge = item.labourCharge;
                rowItem.job.discountPercent = item.discountPercent;
                rowItem.job.subTotal = item.subTotal;

                rowItem.job.pdComeBackJobId = item.pdComeBackJobId;
                rowItem.job.pdPaymentTypeId = item.pdPaymentTypeId;
                rowItem.job.pdJobSourceId = item.pdJobSourceId;
                rowItem.job.pdPaymentTypeId = item.pdPaymentTypeId;

                rowItem.job.listJobType = resultJobType;
                rowItem.job.listJobSource = resultJobSource;
                rowItem.job.listPaymentType = resultPaymentType;

                rowItem.job.parts = [];
                if (item.RepairOrderParts) {
                    item.RepairOrderParts.forEach(part => {
                        var partItem = part;

                        partItem.quantity = part.requestQty;
                        partItem.code = (part.PartMaster && part.PartMaster.code) ? part.PartMaster.code : "";
                        partItem.description = (part.PartMaster && part.PartMaster.description) ? part.PartMaster.description : "";
                        partItem.listPartType = resultPartType;
                        partItem.listPaymentType = resultPaymentType;

                        rowItem.job.parts.push(partItem);
                    });
                }

                this.listRowItem.push(rowItem);
            });
        }
    }

    servicePackageObjects: any;
    servicePackageSelected: any;
    loadServicePackage() {
        this.slimLoadingBarService.start(() => { });

        var vehicleVariantId = this.repairOrder.vehicleVariantId;
        var currentMilleage = this.repairOrder.currentMilleage;

        this.servicePackageService.getAllByVariantIdAndMilleage(null, vehicleVariantId, currentMilleage)
            .retry(3).subscribe(result => {
                if (result != null && result.data != null) {
                    this.servicePackageObjects = [];
                    this.servicePackageObjects = result.data;
                    this.slimLoadingBarService.complete();
                }
            });
    }

    jobGroupObjects: any;
    jobGroupSelected: any;
    loadJobGroupDropdowlist() {
        this.slimLoadingBarService.start(() => { });
        this.jobGroupService.getAll(1, 10, null)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data.length != 0) {
                    this.jobGroupObjects = [];
                    this.jobGroupObjects = result.data.rows;
                    this.slimLoadingBarService.complete();
                }
            });
    }

    jobTypeObjects: any;
    jobTypeSelected: any;
    async loadComebackJobDropdowlist() {
        this.slimLoadingBarService.start(() => { });
        this.repairOrderService.getAllComeBackJob()
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data.length != 0) {
                    this.jobTypeObjects = [];
                    this.jobTypeObjects = result.data;
                    this.slimLoadingBarService.complete();
                }
            });
        return await this.jobTypeObjects;
    }

    jobSourceObjects: any;
    jobSourceSelected: any;
    loadJobSourceDropdowlist() {
        this.slimLoadingBarService.start(() => { });
        this.repairOrderService.getAllJobSource()
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data.length != 0) {
                    this.jobSourceObjects = [];
                    this.jobSourceObjects = result.data;
                    this.slimLoadingBarService.complete();
                }
            });
    }

    partTypeObjects: any;
    partTypeSelected: any;
    loadPartTypeDropdowlist() {
        this.slimLoadingBarService.start(() => { });
        this.repairOrderService.getAllPartType()
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data.length != 0) {
                    this.partTypeObjects = [];
                    this.partTypeObjects = result.data;
                    this.slimLoadingBarService.complete();
                }
            });
    }

    paymentTypeObjects: any;
    paymentTypeSelected: any;
    loadPaymentTypeDropdowlist() {
        this.slimLoadingBarService.start(() => { });
        this.repairOrderService.getAllPaymentType()
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data.length != 0) {
                    this.paymentTypeObjects = [];
                    this.paymentTypeObjects = result.data;
                    this.slimLoadingBarService.complete();
                }
            });
    }

    workShopId = 1; //TODO: need change 
    partObjects: any;
    loadPartDropdowlist() {
        this.slimLoadingBarService.start(() => { });
        var vehicleVariantId = this.repairOrder.vehicleVariantId;
        this.partMasterService.getListPartByWorkShopId(this.workShopId, vehicleVariantId)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null) {
                    this.partObjects = [];
                    this.partObjects = result.data;
                    this.slimLoadingBarService.complete();
                }
            });
    }

    loadDropdownPageSize() {
        this.pageSizeEntitlement = [{ id: 1, text: 10 }, { id: 2, text: 20 }, { id: 3, text: 30 }, { id: 4, text: 50 }];
        this.selectedPageSizeEntitlement = this.pageSizeEntitlement[0];

        this.pageSizePart = [{ id: 1, text: 10 }, { id: 2, text: 20 }, { id: 3, text: 30 }, { id: 4, text: 50 }];
        this.selectedPageSizePart = this.pageSizePart[0];
    }

    isShowErrorQuantity: any;
    listRowItem = [];
    async onClickAdd() {
        var servicePackageId = this.repairOrder.servicePackageId;
        var jobId = (this.repairOrder.jobItem) ? this.repairOrder.jobItem.id : null;
        var partId = (this.repairOrder.partItem) ? this.repairOrder.partItem.id : null;

        if (servicePackageId && servicePackageId != null) {
            if (this.listRowItem != null && this.listRowItem.filter(e => e.servicePackageId === servicePackageId).length > 0) {
                // this.toastyService.error("The record has been exists.!");
                this.messagesService.error("The record has been exists.!");
                return;
            }
            var item = this.servicePackageObjects.find(item => item.id === servicePackageId);
            if (item != null) {
                this.addServicePackageToGrid(this.listRowItem, item);
                this.onChangeQuantityPart(null, null);
            }
        } else if (jobId && jobId != null) {
            if (this.listRowItem != null && this.listRowItem.filter(e => e.job.id === jobId).length > 0) {
                this.messagesService.error("The record has been exists.!");
                return;
            }

            var vehicleVariantId = this.repairOrder.vehicleVariantId;
            if (vehicleVariantId == undefined) {
                this.messagesService.error("Please enter vehicle registrationNo.!");
                $("#vehicleRegistrationNo").focus();
                return;
            }

            var result = await this.jobPartService.getByJobIdAndVariantId(jobId, vehicleVariantId);
            if (result != null && result.data != null) {
                this.addJobPartToGrid(this.listRowItem, result.data);
            } else {
                var jobMaster = this.jobObjects.find(item => item.id === jobId);
                this.addJobIntoGrid(this.listRowItem, null, jobMaster);
            }
            this.onChangeQuantityPart(null, null);
        } else if (partId && partId != null) {
            //check validation part
            if (this.listRowItem != null && this.listRowItem.filter(e => e.job.id === null).length > 0) {
                var jobOther = this.listRowItem.filter(e => e.job.id === null)[0];
                if (jobOther.job && jobOther.job.parts.filter(e => e.id === partId).length > 0) {
                    this.messagesService.error("The record has been exists.!");
                    return;
                }
            }

            this.addPartIntoGrid(this.listRowItem, this.repairOrder.partItem);
            this.onChangeQuantityPart(null, null);
        }
    }

    addJobPartToGrid(listRowItem, jobPart) {
        if (jobPart) {
            this.addJobIntoGrid(listRowItem, null, jobPart);
        }
    }

    addServicePackageToGrid(listRowItem, servicePackage) {
        if (servicePackage && servicePackage.ServicePackageVariants) {
            servicePackage.ServicePackageVariants.forEach(item => {
                var servicePackageJobs = item.ServicePackageJobs;
                if (servicePackageJobs) {
                    servicePackageJobs.forEach(element => {
                        this.addJobIntoGrid(listRowItem, servicePackage, element);
                    });
                }
            });
        }
    }

    convertToModel(listRowItem, servicePackage) {
        if (servicePackage && servicePackage.vehicleVariant) {

            var listJob = servicePackage.vehicleVariant.jobs;
            listJob.forEach(element => {
                this.addJobIntoGrid(listRowItem, servicePackage, element);
            });
        }
    }

    addPartIntoGrid(listRowItem, partItem) {
        var resultJobType = $.extend(true, [], this.jobTypeObjects);
        var resultJobSource = $.extend(true, [], this.jobSourceObjects);
        var resultPartType = $.extend(true, [], this.partTypeObjects);
        var resultPaymentType = $.extend(true, [], this.paymentTypeObjects);

        var repairOrderItem = new RepairOrderItem();
        partItem.unitPrice = (partItem.unitPrice) ? partItem.unitPrice : 0;
        partItem.quantity = (this.repairOrder.quantity) ? this.repairOrder.quantity : 0;

        if (partItem.PartPrices) {
            var partPriceItem = partItem.PartPrices[0];
            if (partPriceItem) {
                partItem.unitPrice = partPriceItem.retailPrice;
            }
        }

        partItem.listPartType = resultPartType;
        partItem.listPaymentType = resultPaymentType;

        //Note:JobId = 99999999: Other job
        if (this.listRowItem != null && this.listRowItem.filter(e => e.job.id === null).length > 0) {
            repairOrderItem = this.listRowItem.filter(e => e.job.id === null)[0];
            repairOrderItem.job.parts.push(partItem);
        } else {
            repairOrderItem.job = new JobItem();
            repairOrderItem.job.id = null;
            repairOrderItem.job.code = "Other";
            repairOrderItem.job.labourCharge = 0;
            repairOrderItem.job.parts = [];
            repairOrderItem.job.parts.push(partItem);
            listRowItem.push(repairOrderItem);
        }
    }

    addJobIntoGrid(listRowItem, servicePackage, item) {
        if (item) {
            var resultJobType = $.extend(true, [], this.jobTypeObjects);
            var resultJobSource = $.extend(true, [], this.jobSourceObjects);
            var resultPartType = $.extend(true, [], this.partTypeObjects);
            var resultPaymentType = $.extend(true, [], this.paymentTypeObjects);

            var repairOrderItem = new RepairOrderItem();

            repairOrderItem.job = item.JobMaster;
            if (servicePackage) { // Case servicePackage
                repairOrderItem.servicePackageId = (servicePackage && servicePackage.id) ? servicePackage.id : null;
                repairOrderItem.packageCode = (servicePackage && servicePackage.code) ? servicePackage.code : null;
                repairOrderItem.itemDescription = (servicePackage && servicePackage.description) ? servicePackage.description : null;

                repairOrderItem.job.labourCharge = item.labourCharge;
                repairOrderItem.job.servicePackageJobId = item.id;
                repairOrderItem.job.parts = [];

                item.ServicePackageParts.forEach(element => {
                    var part = element.PartMaster;
                    part.unitPrice = element.unitPrice;
                    part.quantity = element.quantity;
                    part.servicePackagePartId = element.id;

                    part.listPaymentType = resultPaymentType;
                    part.listPartType = resultPartType;

                    repairOrderItem.job.parts.push(part);
                });
            } else { // Case jobPart
                repairOrderItem.job = item;
                repairOrderItem.job.parts = [];

                if (item.JobPartItems) {
                    item.JobPartItems.forEach(element => {
                        element.listPaymentType = resultPaymentType;
                        element.listPartType = resultPartType;

                        repairOrderItem.job.parts.push(element);
                    });
                }

                var jobPrice = item.JobPrices[0];
                if (jobPrice) { // case add price from jobMaster
                    repairOrderItem.job.labourCharge = (jobPrice.retailPrice) ? jobPrice.retailPrice : 0;
                }
            }

            // repairOrderItem.job.listPartType = resultPartType;
            repairOrderItem.job.listJobType = resultJobType;
            repairOrderItem.job.listPaymentType = resultPaymentType;
            repairOrderItem.job.listJobSource = resultJobSource;
            repairOrderItem.job.partTypeId = 0;

            listRowItem.push(repairOrderItem);
        }
    }

    onChangeQuantityPart(partId, quantity) {
        if (this.listRowItem) {
            var totalLabourCharge = 0;
            var totalPartAmt = 0;
            this.listRowItem.forEach(item => {
                if (item.job) {
                    totalLabourCharge += (item.job.labourCharge) ? item.job.labourCharge : 0;
                    if (item.job.parts) {
                        item.job.parts.forEach(part => {
                            var newQuantity = (part.quantity) ? part.quantity : 0;
                            var price = (part.unitPrice) ? part.unitPrice : 0;
                            if (part.id === partId) {
                                newQuantity = quantity;
                            }
                            totalPartAmt += (newQuantity * price);
                        });
                    }
                }
            });

            this.repairOrder.totalLabourCharge = totalLabourCharge;
            this.repairOrder.totalPartAmt = totalPartAmt;
        }
    }

    onChangeServicePackage(servicePackageId) {
        this.repairOrder.servicePackageId = servicePackageId;
        this.clearJobPart();
    }

    clearJobPart() {
        this.repairOrder.jobGroupId = null;
        this.repairOrder.jobItem = null;
        this.repairOrder.partItem = null;
        this.repairOrder.partId = null;
        this.repairOrder.Qty = null;
    }

    onChangeJobGroup(jobGroupId) {
        if (jobGroupId) {
            this.repairOrder.jobGroupId = jobGroupId;
            this.loadJobDropdowlist();
            this.repairOrder.servicePackageId = null;
        }
    }

    onChangeJob(jobItem) {
        if (jobItem) {
            this.repairOrder.jobItem = jobItem;
            this.repairOrder.partItem = null;
            this.repairOrder.partId = null;
            this.repairOrder.servicePackageId = null;
        }
    }

    onChangePart(partItem) {
        if (partItem) {
            this.repairOrder.partItem = partItem;
            this.repairOrder.servicePackageId = null;
            this.repairOrder.jobItem = null;
            this.repairOrder.jobId = null;
            this.repairOrder.pdJobTypeId = null;
            this.repairOrder.jobGroupId = null;
        }
    }

    onChangePartSource(partSourceId) {
        if (partSourceId) {
            this.repairOrder.partSourceId = partSourceId;
        }
    }

    jobSectionObjects: any;
    jobSectionSelected: any;
    loadSectionDropdowlist(jobGroupId) {
        this.slimLoadingBarService.start(() => { });
        this.jobSectionService.getListSectionByJobGroupId(jobGroupId)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null) {
                    this.jobSectionObjects = result;
                    this.slimLoadingBarService.complete();
                }
            });
    }

    jobObjects: any;
    jobSelected: any;
    loadJobDropdowlist() {
        this.slimLoadingBarService.start(() => { });
        var jobGroupId = this.repairOrder.jobGroupId != null ? this.repairOrder.jobGroupId : null;
        var vehicleVariantId = this.repairOrder.vehicleVariantId != null ? this.repairOrder.vehicleVariantId : null;

        this.jobCodeService.getListJobByJobGroupId(jobGroupId, vehicleVariantId)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null) {
                    this.jobObjects = result.data;
                    this.slimLoadingBarService.complete();
                }
            });
    }

    openPopupVehicle(event: any) {
        var registrationNo = event.target.value;
        if (registrationNo.length >= 3) {
            this.bindInformationByRegistrationNo(registrationNo);
        }
    }

    bindInformationByRegistrationNo(registrationNo) {
        this.isProcessing = true;
        this.slimLoadingBarService.start(() => { });
        this.vehicleCustomerService
            .getVehicleByRegistrationNo(registrationNo)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null) {
                    this.setVehicleCustomer(result.data);
                    this.loadServicePackage();
                    this.loadJobDropdowlist();
                    this.loadPartDropdowlist();

                    this.slimLoadingBarService.complete();
                } else {
                    this.resetVehicleCustomer();
                    $('#dialogVehicleProfileAdd-modal').modal('show');
                }
                this.isProcessing = false;
            });
        this.isProcessing = false;
    }

    resetVehicleCustomer() {
        this.repairOrder.vehicleRegistrationNo = null;
        this.repairOrder.customerName = null;
        this.repairOrder.vinNo = null;
        this.repairOrder.chassisNo = null;
        this.repairOrder.modelVariant = null;
        this.repairOrder.vehicleModel = null;
        this.repairOrder.vehicleMake = null;
    }

    setVehicleCustomer(vehicleCustomer) {
        this.repairOrder.vehicleCustomerId = vehicleCustomer.id;
        this.repairOrder.vehicleRegistrationNo = vehicleCustomer.registrationNo;
        this.repairOrder.customerName = vehicleCustomer.Customer.name;
        this.repairOrder.vinNo = vehicleCustomer.Vehicle.vinNo;
        this.repairOrder.chassisNo = vehicleCustomer.Vehicle.chassisNo;

        if (vehicleCustomer.Vehicle && vehicleCustomer.Vehicle.VehicleVariant) {
            this.repairOrder.modelVariant = (vehicleCustomer.Vehicle.VehicleVariant.code) ? vehicleCustomer.Vehicle.VehicleVariant.code : "";
            this.repairOrder.vehicleVariantId = (vehicleCustomer.Vehicle.VehicleVariant.id) ? vehicleCustomer.Vehicle.VehicleVariant.id : "";
            if (vehicleCustomer.Vehicle.VehicleVariant.VehicleModel) {
                this.repairOrder.vehicleModel = (vehicleCustomer.Vehicle.VehicleVariant.VehicleModel.code) ? vehicleCustomer.Vehicle.VehicleVariant.VehicleModel.code : "";
                if (vehicleCustomer.Vehicle.VehicleVariant.VehicleModel.VehicleMake) {
                    this.repairOrder.vehicleMake = (vehicleCustomer.Vehicle.VehicleVariant.VehicleModel.VehicleMake.code) ? vehicleCustomer.Vehicle.VehicleVariant.VehicleModel.VehicleMake.code : "";
                }
            }
        }
    }

    addUpdate(repairOrder) {
        debugger;
        this.repairOrder.jobs = this.listRowItem;

        if (!this.isValidateRepairOrder(repairOrder))
            return

        if (this.repairOrder.id) {
            this.repairOrderService.updateRepairOrder(this.repairOrder).subscribe(result => {
                if (result != null && result.success) {

                }
            });
        } else {
            this.repairOrderService.addRepairOrder(this.repairOrder).subscribe(result => {
                if (result != null && result.success) {
                    var repairOrderId = result.data;
                    this.repairOrder.id = repairOrderId;
                    if (!this.repairOrder.isUpdate) {
                        var jobFulfilment = new JobFulfilmentModel();
                        jobFulfilment.repairOrderId = repairOrderId;
                        jobFulfilment.jobFulfilmentStatusId = 1;
                        jobFulfilment.serviceAdvisorId = null; // todo
                        this.jobFulfilmentService.initJobFulfilment(jobFulfilment).then(newJobFulfilment => {
                            jobFulfilment = newJobFulfilment;
                            // show suggestion bay
                            if (this.repairOrder.jobs && this.repairOrder.jobs.length > 0) {
                                this.repairOrderBay = {
                                    repairOrderId: repairOrderId,
                                    jobFulfilmentId: jobFulfilment.id
                                }
                                $('#suggestion-jpcb-modal').modal();
                            }
                        })
                    }
                    // this.toastyService.success(result.message);
                } else {
                    this.messagesService.error(result.message);
                }
            });
        }
    }

    isValidateRepairOrder(repairOrder) {
        if (!repairOrder)
            return false;

        return true;
    }
}