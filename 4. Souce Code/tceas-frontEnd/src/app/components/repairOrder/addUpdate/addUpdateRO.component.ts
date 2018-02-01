import { Utils } from './../../../commons/app.utils';
import { AppointmentService } from './../../appointment/services/appointment.service';
import { TranslateService } from '@ngx-translate/core';
import { JobPartItem } from './../models/jobPart.item.model';
import { Constants } from './../../../config/app.constant';
import { Observable } from 'rxjs/Observable';
import { MessagesService } from './../../../commons/message.utils';
import { JobFulfilmentService } from './../../jobFulfilment/services/jobFulfilment.service';
import { ServicePackageService } from './../../servicePackage/services/servicePackage.service';
import { Message, ConfirmationService } from 'primeng/primeng';
import { RepairOrderItem, JobItem } from './../models/repairOrder.item.model';
import { JobFulfilmentModel } from './../../jobFulfilment/models/jobFulfilment.model';
import { PartMasterService } from './../../partMaster/services/partMaster.service';
import { JobCodeService } from './../../jobCode/services/jobCode.service';
import { JobCodeAddUpdateComponent } from './../../jobCode/addUpdate/addUpdateJobCode.component';
import { JobGroupService } from './../../jobGroup/services/jobGroup.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { RepairOrderService } from './../services/repairOrder.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms/forms";
import { JobSectionService } from "../../jobSection/services/jobSection.service";
import { Select2OptionData } from 'ng2-select2';
import { VehicleCustomerService } from "../../shared/services/vehicleCustomer.service";
import { JobPartService } from "../../shared/services/jobPart.service";

declare var $: any;
@Component({
    selector: "RO-addUpdate",
    templateUrl: './addUpdateRO.component.html',
    styleUrls: ['./addUpdateRO.style.css'],
    providers: [JobGroupService, JobCodeService, JobSectionService, PartMasterService, JobPartService, ServicePackageService, VehicleCustomerService,
        JobFulfilmentService, AppointmentService]
})

export class ROAddUpdateComponent implements OnInit {
    id: number = null;
    appoinmentId: number = null;
    repairOrder: any;
    private sub: any;
    isProcessing = false;
    partSelected: any;
    selected: any;
    repairOrderBay: any;
    private msgs: Message[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
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
        private constant: Constants,
        private confirmationService: ConfirmationService,
        private messagesService: MessagesService,
        private translate: TranslateService,
        private appointmentService: AppointmentService,
        private utils: Utils,
    ) {

    }

    ngOnInit(): void {
        this.repairOrder = {};
        this.repairOrder.isUpdate = false;
        this.repairOrder.isCustomerWaiting = this.constant.RADIO_DEFAULT;
        this.repairOrder.isExpressService = this.constant.RADIO_DEFAULT;
        this.repairOrder.isNPMPCustomer = this.constant.RADIO_DEFAULT;
        this.repairOrder.isContactPerson = this.constant.RADIO_DEFAULT;
        this.repairOrder.dateTimeIn = new Date();
        this.repairOrder.expectedDeliveryDateTime = new Date();
        this.repairOrder.totalLabourCharge = 0;
        this.repairOrder.totalPartAmt = 0;
        this.repairOrder.labourDiscount = 0;
        this.repairOrder.partDiscount = 0;
        this.repairOrder.status = this.constant.STATUS_NEW;
        this.listJobDeleted = [];
        this.listPartDeleted = [];
        this.msgs = [];

        this.sub = this.route.params.subscribe(params => {
            this.id = (params['id'] != undefined) ? params['id'] : null;
            this.appoinmentId = (params['appoinmentId'] != undefined) ? params['appoinmentId'] : null;
        });

        if (this.id != null) {
            this.bindRepairOrderById(this.id);
        } else {
            if (this.appoinmentId != null) {
                this.bindRepairOrderByApoinmentId(this.appoinmentId);
            } else { // case create new 
                this.loadPackageTypeDropdowlist();
                this.loadJobGroupDropdowlist();
                this.loadComebackJobDropdowlist();
                this.loadJobSourceDropdowlist();
                this.loadPartSourceDropdowlist();
                this.loadPaymentTypeDropdowlist();

                // init default value for dropdowlist
                this.initDefaultForDropdowlist();
            }
        }

        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        this.clearDropdowValue();
    }

    clearDropdowValue() {
        this.repairOrder.jobItem = null;
        this.repairOrder.partItem = null;
        this.repairOrder.partId = null;
        this.repairOrder.jobId = null;
        this.repairOrder.servicePackage = null;
        this.repairOrder.servicePackageId = null;
        this.repairOrder.packageTypeId = null;
        this.repairOrder.pdJobTypeId = null;
        this.repairOrder.jobGroupId = null;
    }

    initDefaultForDropdowlist() {
        this.servicePackageObjects = [];
        this.jobObjects = [];
        this.partObjects = [];

        this.servicePackageObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
        this.jobObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
        this.partObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
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
            this.repairOrderService.getAllPartSource().map((res: any) => res),
            this.repairOrderService.getAllPaymentType().map((res: any) => res),
            this.repairOrderService.getFullRepairOrderById(this.id).map((res: any) => res)
        ).subscribe(data => {
            this.jobTypeObjects = [];
            this.jobSourceObjects = [];
            this.partSourceObjects = [];
            this.paymentTypeObjects = [];

            this.jobTypeObjects = data[0].success ? this.setDataForDropdowlist(data[0].data) : [];
            this.jobSourceObjects = data[1].success ? this.setDataForDropdowlist(data[1].data) : [];
            this.partSourceObjects = data[2].success ? this.setDataForDropdowlist(data[2].data) : [];
            this.paymentTypeObjects = data[3].success ? data[3].data : [];

            if (data[4] && data[4].success) {
                this.repairOrder = data[4].data;
                this.repairOrder.isUpdate = true;
                this.repairOrder.labourDiscount = 0;
                this.repairOrder.partDiscount = 0;
                this.repairOrder.totalGoodwillAmt = 0;
                this.repairOrder.taxAmt = 0;
                this.repairOrder.totalAfterTax = 0;
                this.repairOrder.totalBeforeTaxAmt = 0;

                var vehicleCustomer = this.repairOrder.VehicleCustomer;
                if (vehicleCustomer) {
                    this.setVehicleCustomer(vehicleCustomer);
                }
                if (this.repairOrder) {
                    this.setDataForGrid(this.repairOrder, false);
                    this.onChangeQuantityPart(null, null);
                }

                this.loadPackageTypeDropdowlist();
                this.loadJobGroupDropdowlist();
                this.loadServicePackage();
                this.loadJobDropdowlist();
                this.loadPartDropdowlist();
                this.loadAppointmentDropdowlist(this.repairOrder.vehicleRegistrationNo);
                this.slimLoadingBarService.complete();

                this.clearDropdowValue();
            }
        });
    }

    bindRepairOrderByApoinmentId(appointmentId) {
        this.slimLoadingBarService.start(() => { });
        Observable.forkJoin(
            this.repairOrderService.getAllComeBackJob().map((res: any) => res),
            this.repairOrderService.getAllJobSource().map((res: any) => res),
            this.repairOrderService.getAllPartSource().map((res: any) => res),
            this.repairOrderService.getAllPaymentType().map((res: any) => res),
            this.appointmentService.getFullAppointmentById(appointmentId).map((res: any) => res)
        ).subscribe(data => {
            this.jobTypeObjects = [];
            this.jobSourceObjects = [];
            this.partSourceObjects = [];
            this.paymentTypeObjects = [];

            this.jobTypeObjects = data[0].success ? this.setDataForDropdowlist(data[0].data) : [];
            this.jobSourceObjects = data[1].success ? this.setDataForDropdowlist(data[1].data) : [];
            this.partSourceObjects = data[2].success ? this.setDataForDropdowlist(data[2].data) : [];
            this.paymentTypeObjects = data[3].success ? data[3].data : [];

            if (data[4] && data[4].success) {
                this.repairOrder = data[4].data;
                this.repairOrder.appointmentId = this.repairOrder.id;
                this.repairOrder.id = null;
                this.repairOrder.isUpdate = false;
                this.repairOrder.labourDiscount = 0;
                this.repairOrder.partDiscount = 0;
                this.repairOrder.totalGoodwillAmt = 0;
                this.repairOrder.taxAmt = 0;
                this.repairOrder.totalAfterTax = 0;
                this.repairOrder.totalBeforeTaxAmt = 0;
                this.repairOrder.isCustomerWaiting = this.constant.RADIO_DEFAULT;
                this.repairOrder.isExpressService = this.constant.RADIO_DEFAULT;
                this.repairOrder.isNPMPCustomer = this.constant.RADIO_DEFAULT;
                this.repairOrder.isContactPerson = this.constant.RADIO_DEFAULT;
                this.repairOrder.status = this.constant.STATUS_NEW;

                var vehicleCustomer = this.repairOrder.VehicleCustomer;
                if (vehicleCustomer) {
                    this.setVehicleCustomer(vehicleCustomer);
                }
                if (this.repairOrder) {
                    this.setDataForGrid(this.repairOrder, true);
                    this.onChangeQuantityPart(null, null);
                }

                this.loadPackageTypeDropdowlist();
                this.loadJobGroupDropdowlist();
                this.loadServicePackage();
                this.loadJobDropdowlist();
                this.loadPartDropdowlist();
                this.loadAppointmentDropdowlist(this.repairOrder.vehicleRegistrationNo);
                this.slimLoadingBarService.complete();

                this.clearDropdowValue();
            }
        });
    }

    setDataForDropdowlist(listItem) {
        var newListItem = listItem.map(c => ({ label: c.code + " - " + c.description, value: c.id }));
        newListItem.unshift({ label: this.constant.SELECT_DEFAULT, value: null });

        return newListItem;
    }

    setDataForGrid(repairOrder, isPointment) {
        if (repairOrder) {
            var resultJobType = $.extend(true, [], this.jobTypeObjects);
            var resultJobSource = $.extend(true, [], this.jobSourceObjects);
            var resultPartSource = $.extend(true, [], this.partSourceObjects);
            var resultPaymentType = $.extend(true, [], this.paymentTypeObjects);

            var repairOrderJobs = repairOrder.RepairOrderJobs;
            if (isPointment) {
                repairOrderJobs = repairOrder.AppointmentJobs;
            }
            if (repairOrderJobs) {
                repairOrderJobs.forEach(item => {
                    var rowItem = new RepairOrderItem();

                    rowItem.servicePackageId = (item.ServicePackageMaster) ? item.ServicePackageMaster.id : null;
                    rowItem.packageCode = (item.ServicePackageMaster) ? item.ServicePackageMaster.code : "";
                    rowItem.itemDescription = (item.ServicePackageMaster) ? item.ServicePackageMaster.description : "";
                    rowItem.job = (item.JobMaster) ? item.JobMaster : {};
                    rowItem.job.repairOrderJobId = item.id;
                    rowItem.job.labourCharge = item.labourCharge;
                    rowItem.job.discountPercent = item.discountPercent;
                    rowItem.job.subTotal = item.subTotal;

                    rowItem.job.listJobType = resultJobType;
                    rowItem.job.listJobSource = resultJobSource;
                    rowItem.job.listPaymentType = resultPaymentType;

                    rowItem.job.pdComeBackJobId = item.pdComeBackJobId;
                    rowItem.job.pdPaymentTypeId = item.pdPaymentTypeId;
                    rowItem.job.pdJobSourceId = item.pdJobSourceId;

                    var paymentItem = resultPaymentType.filter(e => e.id === item.pdPaymentTypeId && e.isGoodWill);
                    if (paymentItem.length > 0) {
                        rowItem.job.isGoodWill = true;
                        rowItem.job.goodWillPercent = item.goodWillPercent;
                        rowItem.job.goodWillAmt = item.goodWillAmt;
                        rowItem.job.discountPercent = item.discountPercent;
                        rowItem.job.discountAmt = item.discountAmt;
                        rowItem.job.netAmt = item.netAmt;
                    } else {
                        rowItem.job.isGoodWill = false;
                    }

                    this.listRowItem.push(rowItem);
                });
            }

            this.listJobPart = [];
            var repairOrderParts = repairOrder.RepairOrderParts;
            if (isPointment) {
                repairOrderParts = repairOrder.AppointmentParts;
            }
            if (repairOrderParts) {
                repairOrderParts.forEach(item => {
                    var jobItem = item;
                    var partItem: any = {};

                    partItem.jobId = (item.JobMaster) ? item.JobMaster.id : null;
                    partItem.repairOrderPartId = item.id;
                    partItem.partId = (item.PartMaster && item.PartMaster.id) ? item.PartMaster.id : 0
                    partItem.quantity = item.requestQty;
                    partItem.unitPrice = item.unitPrice;
                    partItem.code = (item.PartMaster && item.PartMaster.code) ? item.PartMaster.code : "";
                    partItem.description = (item.PartMaster && item.PartMaster.description) ? item.PartMaster.description : "";

                    partItem.listPartType = resultPartSource;
                    partItem.listPaymentType = resultPaymentType;

                    partItem.pdPartSourceId = item.pdPartSourceId;
                    partItem.pdPaymentTypeId = item.pdPaymentTypeId;

                    var paymentItem = resultPaymentType.filter(e => e.id === item.pdPaymentTypeId && e.isGoodWill);
                    if (paymentItem.length > 0) {
                        partItem.isGoodWill = true;
                        partItem.goodWillPercent = item.goodWillPercent;
                        partItem.goodWillAmt = item.goodWillAmt;
                        partItem.discountPercent = item.discountPercent;
                        partItem.discountAmt = item.discountAmt;
                        partItem.netAmt = item.netAmt;
                    } else {
                        if (partItem.job === undefined)
                            partItem.job = {};
                        partItem.job.isGoodWill = false;
                    }

                    jobItem.part = partItem;
                    this.listJobPart.push(jobItem);
                });
            }
        }
    }

    servicePackageObjects: any;
    servicePackageSelected: any;
    loadServicePackage() {
        this.slimLoadingBarService.start(() => { });

        var packageTypeId = this.repairOrder.packageTypeId;
        var vehicleVariantId = this.repairOrder.vehicleVariantId;
        var currentMilleage = this.repairOrder.currentMilleage;

        this.servicePackageService.getAllByVariantIdAndMilleage(vehicleVariantId, packageTypeId, currentMilleage)
            .retry(3).subscribe(result => {
                this.servicePackageObjects = [];
                if (result != null && result.data != null) {
                    this.servicePackageObjects = result.data.map(c => ({ label: c.code + " - " + c.description, value: c }));
                    this.servicePackageObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                    this.slimLoadingBarService.complete();
                }
            });
    }

    packageTypeObjects: any;
    packageTypeSelected: any;
    loadPackageTypeDropdowlist() {
        this.slimLoadingBarService.start(() => { });
        this.servicePackageService.getAllPackageTypes()
            .retry(3)
            .subscribe(result => {
                this.packageTypeObjects = [];
                if (result != null && result.data.length != 0) {
                    this.packageTypeObjects = result.data.map(c => ({ label: c.code + " - " + c.description, value: c.id }));
                    this.packageTypeObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
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
                this.jobGroupObjects = [];
                if (result != null && result.data.length != 0) {
                    this.jobGroupObjects = result.data.rows.map(c => ({ label: c.code + " - " + c.description, value: c.id }));
                    this.jobGroupObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });

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
                this.jobTypeObjects = [];
                if (result != null && result.data.length != 0) {
                    this.jobTypeObjects = result.data.map(c => ({ label: c.code + " - " + c.description, value: c.id }));
                    this.jobTypeObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
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
                this.jobSourceObjects = [];
                if (result != null && result.data.length != 0) {
                    this.jobSourceObjects = result.data.map(c => ({ label: c.code + " - " + c.description, value: c.id }));
                    this.jobSourceObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                    this.slimLoadingBarService.complete();
                }
            });
    }

    partSourceObjects: any;
    partTypeSelected: any;
    loadPartSourceDropdowlist() {
        this.slimLoadingBarService.start(() => { });
        this.repairOrderService.getAllPartSource()
            .retry(3)
            .subscribe(result => {
                this.partSourceObjects = [];
                if (result != null && result.data.length != 0) {
                    this.partSourceObjects = result.data.map(c => ({ label: c.code + " - " + c.description, value: c.id }));
                    this.partSourceObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
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
                this.paymentTypeObjects = [];
                if (result != null && result.data.length != 0) {
                    this.paymentTypeObjects = result.data.map(c => ({ label: c.code + " - " + c.description, value: c }));
                    this.paymentTypeObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
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
                this.partObjects = [];
                if (result != null && result.data != null) {
                    this.partObjects = result.data.map(c => ({ label: c.code + " - " + c.description, value: c }));
                    this.partObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                    this.slimLoadingBarService.complete();
                }
            });
    }

    appointmentObjects: any;
    loadAppointmentDropdowlist(registrationNo) {
        this.slimLoadingBarService.start(() => { });
        this.appointmentService.getAllAppointmentByRegistrationNo(this.workShopId, registrationNo)
            .retry(3)
            .subscribe(result => {
                this.appointmentObjects = [];
                if (result != null && result.data != null) {
                    this.appointmentObjects = result.data.map(c => ({ label: c.appointmentNo, value: c.id }));
                    this.appointmentObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                    this.slimLoadingBarService.complete();
                }
            });
    }

    isShowErrorQuantity: any;
    listRowItem = [];
    async onClickAdd() {
        var servicePackageId = (this.repairOrder.servicePackage) ? this.repairOrder.servicePackage.id : null;
        var jobId = (this.repairOrder.jobItem) ? this.repairOrder.jobItem.id : null;
        var partId = (this.repairOrder.partItem) ? this.repairOrder.partItem.id : null;

        if (servicePackageId && servicePackageId != null) {
            if (this.listRowItem != null && this.listRowItem.filter(e => e.servicePackageId === servicePackageId).length > 0) {
                this.messagesService.error("COMMON_RECORD_EXISTS");
                return;
            }
            var item = this.repairOrder.servicePackage;
            if (item != null) {
                this.addServicePackageToGrid(this.listRowItem, item);
                this.onChangeQuantityPart(null, null);
            }
        } else if (jobId && jobId != null) {
            if (this.listRowItem != null && this.listRowItem.filter(e => e.job.id === jobId).length > 0) {
                this.messagesService.error("COMMON_RECORD_EXISTS");
                return;
            }

            var vehicleVariantId = this.repairOrder.vehicleVariantId;
            if (vehicleVariantId == undefined) {
                this.messagesService.error("REPAIR_ORDER_ENTER_REGISTRATION_NO");
                $("#vehicleRegistrationNo").focus();
                return;
            }

            var result = await this.jobPartService.getByJobIdAndVariantId(jobId, vehicleVariantId);
            if (result != null && result.data != null) {
                this.addJobPartToGrid(this.listRowItem, result.data);
            } else {
                var jobMaster = this.repairOrder.jobItem;
                this.addJobIntoGrid(this.listRowItem, null, jobMaster);
            }
            this.onChangeQuantityPart(null, null);
        } else if (partId && partId != null) {
            if (this.listJobPart != null && this.listJobPart.filter(e => e.part.partId === partId).length > 0) {
                this.messagesService.error("COMMON_RECORD_EXISTS");
                return;
            }

            this.addPartIntoGrid(this.repairOrder.partItem);
            this.onChangeQuantityPart(null, null);
        }

        this.clearDropdowValue();
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

    onChangeAppointment(appointmentId) {
        console.log(appointmentId);
    }

    onChangeDiscount(discountPercent, jobOrPart, isPart) {
        if (isPart) {
            var price = (jobOrPart.quantity * jobOrPart.unitPrice);
            jobOrPart.discountAmt = price * discountPercent;
        } else {
            jobOrPart.discountAmt = jobOrPart.labourCharge * discountPercent;
        }
        this.onChangeQuantityPart(null, null);
    }

    onChangeGoodwill(goodWillPercent, jobOrPart, isPart) {
        if (isPart) {
            var price = (jobOrPart.quantity * jobOrPart.unitPrice);
            jobOrPart.goodWillAmt = price * goodWillPercent;
        } else {
            jobOrPart.goodWillAmt = jobOrPart.labourCharge * goodWillPercent;
        }
        this.onChangeQuantityPart(null, null);
    }

    addPartIntoGrid(partItem) {
        var resultPartSource = $.extend(true, [], this.partSourceObjects);
        var resultPaymentType = $.extend(true, [], this.paymentTypeObjects);

        var jobPartItem = new JobPartItem();
        partItem.unitPrice = (partItem.unitPrice) ? partItem.unitPrice : 0;
        partItem.quantity = (this.repairOrder.quantity) ? this.repairOrder.quantity : 0;

        if (partItem.PartPrices) {
            var partPriceItem = partItem.PartPrices[0];
            if (partPriceItem) {
                partItem.unitPrice = partPriceItem.retailPrice;
            }
        }

        jobPartItem.code = "";
        partItem.listPartType = resultPartSource;
        partItem.listPaymentType = resultPaymentType;

        //set default value 
        partItem.pdPaymentTypeId = (resultPaymentType && resultPaymentType[1].value) ? resultPaymentType[1].value : null;
        partItem.pdPartSourceId = (resultPartSource && resultPartSource[1].value) ? resultPartSource[1].value : null;

        jobPartItem.part = partItem;
        jobPartItem.part.partId = partItem.id;

        this.listJobPart = (this.listJobPart == undefined) ? [] : this.listJobPart;
        this.listJobPart.push(jobPartItem);
    }

    listJobPart: JobPartItem[];
    addJobIntoGrid(listRowItem, servicePackage, item) {
        if (item) {
            var resultJobType = $.extend(true, [], this.jobTypeObjects);
            var resultJobSource = $.extend(true, [], this.jobSourceObjects);
            var resultPartSource = $.extend(true, [], this.partSourceObjects);
            var resultPaymentType = $.extend(true, [], this.paymentTypeObjects);

            var repairOrderItem = new RepairOrderItem();

            repairOrderItem.job = item.JobMaster ? item.JobMaster : item;
            if (servicePackage) { // Case servicePackage
                var servicePackageId = (servicePackage && servicePackage.id) ? servicePackage.id : null;
                repairOrderItem.servicePackageId = servicePackageId;
                repairOrderItem.packageCode = (servicePackage && servicePackage.code) ? servicePackage.code : null;
                repairOrderItem.itemDescription = (servicePackage && servicePackage.description) ? servicePackage.description : null;

                repairOrderItem.job.labourCharge = item.labourCharge;
                repairOrderItem.job.servicePackageJobId = item.id;

                //add job and part
                if (!this.listJobPart || this.listJobPart.length === 0) {
                    this.listJobPart = [];
                }

                item.ServicePackageParts.forEach(element => {
                    var jobItem = item.JobMaster;

                    var part = element.PartMaster;
                    part.partId = part.id;
                    part.unitPrice = element.unitPrice;
                    part.quantity = element.quantity;
                    part.servicePackageId = servicePackageId;

                    part.listPaymentType = resultPaymentType;
                    part.listPartType = resultPartSource;

                    //set default value 
                    part.pdPaymentTypeId = (resultPaymentType && resultPaymentType[1].value) ? resultPaymentType[1].value : null;
                    part.pdPartSourceId = (resultPartSource && resultPartSource[1].value) ? resultPartSource[1].value : null;

                    jobItem.part = part;
                    this.listJobPart.push(jobItem);
                });
            } else { // Case jobPart
                if (item.JobPartItems) {
                    item.JobPartItems.forEach(part => {
                        var jobItem = item;

                        part.listPaymentType = resultPaymentType;
                        part.listPartType = resultPartSource;

                        //set default value 
                        part.pdPaymentTypeId = (resultPaymentType && resultPaymentType[0].value) ? resultPaymentType[0].value : null;
                        part.pdPartSourceId = (resultPartSource && resultPartSource[0].value) ? resultPartSource[0].value : null;

                        jobItem.part = part;
                        jobItem.part.partId = part.id;

                        this.listJobPart.push(jobItem);
                    });
                }

                var jobPrice = item.JobPrices[0];
                if (jobPrice) { // case add price from jobMaster
                    repairOrderItem.job.labourCharge = (jobPrice.retailPrice) ? jobPrice.retailPrice : 0;
                }
            }
            repairOrderItem.job.listJobType = resultJobType;
            repairOrderItem.job.listPaymentType = resultPaymentType;
            repairOrderItem.job.listJobSource = resultJobSource;

            //set default value 
            repairOrderItem.job.pdPaymentTypeId = (resultPaymentType && resultPaymentType[1].value) ? resultPaymentType[1].value : null;
            repairOrderItem.job.pdJobSourceId = (resultJobSource && resultJobSource[1].value) ? resultJobSource[1].value : null;
            repairOrderItem.job.pdComeBackJobId = (resultJobType && resultJobType[1].value) ? resultJobType[1].value : null;

            listRowItem.push(repairOrderItem);
        }
    }

    onChangeQuantityPart(partId, quantity) {
        if (this.listRowItem) {
            var totalLabourCharge = 0;
            var totalPartAmt = 0;
            var totalLabourDiscount = 0;
            var totalPartDiscount = 0;
            var totalGoodWillPercent = 0;
            var totalGoodwillAmt = 0;
            var totalBeforeTaxAmt = 0;

            this.listRowItem.forEach(item => {
                if (item.job) {
                    var labourCharge = (item.job.labourCharge ? item.job.labourCharge : 0);
                    totalLabourCharge += labourCharge;

                    var discountAmtJob = item.job.labourCharge * item.job.discountPercent;
                    totalLabourDiscount += (discountAmtJob) ? discountAmtJob : 0;

                    var goodWillAmt = labourCharge * (item.job.goodWillPercent ? item.job.goodWillPercent : 0);
                    totalGoodwillAmt += goodWillAmt;
                }
            });

            if (this.listJobPart) {
                this.listJobPart.forEach(item => {
                    var part = item.part;
                    if (part) {
                        var newQuantity = (part.quantity) ? part.quantity : 0;
                        var price = (part.unitPrice) ? part.unitPrice : 0;
                        if (part.id === partId) {
                            newQuantity = quantity;
                        }
                        totalPartAmt += (newQuantity * price);
                        totalPartDiscount += (part.discountAmt) ? part.discountAmt : 0;

                        var goodWillAmt = price * (part.goodWillPercent ? part.goodWillPercent : 0);
                        totalGoodwillAmt += goodWillAmt;
                    }
                });
            }

            var additionalDiscount = this.repairOrder.additionalDiscount;
            totalBeforeTaxAmt = (totalLabourCharge ? totalLabourCharge : 0) + (totalPartAmt ? totalPartAmt : 0) - (totalPartDiscount ? totalPartDiscount : 0) - (totalLabourDiscount ? totalLabourDiscount : 0) - additionalDiscount - (totalGoodwillAmt ? totalGoodwillAmt : 0);
            var taxAmt = this.constant.SALE_TAX * totalBeforeTaxAmt;

            this.repairOrder.totalLabourCharge = totalLabourCharge;
            this.repairOrder.totalPartAmt = totalPartAmt;
            this.repairOrder.labourDiscount = totalLabourDiscount;
            this.repairOrder.partDiscount = totalPartDiscount;
            this.repairOrder.totalGoodwillAmt = totalGoodwillAmt; // sum total goodwill's part and job
            this.repairOrder.totalBeforeTaxAmt = totalBeforeTaxAmt;
            this.repairOrder.taxAmt = taxAmt;
            this.repairOrder.totalAfterTaxAmt = totalBeforeTaxAmt + taxAmt;
        }
    }

    onChangePackageType(packageTypeId) {
        if (packageTypeId) {
            this.repairOrder.packageTypeId = packageTypeId;

            this.clearJobPart();
            this.loadServicePackage();
        }
    }

    onChangeServicePackage(servicePackage) {
        if (servicePackage) {
            this.repairOrder.servicePackage = servicePackage;
            this.clearJobPart();
        }
    }

    onChangeJobType(jobItem, pdComeBackJobId) {
        jobItem.pdComeBackJobId = pdComeBackJobId;
    }

    onChangePaymentType(rowItem, pdPaymentTypeId) {
        rowItem.pdPaymentTypeId = pdPaymentTypeId;
        var paymentItem = this.paymentTypeObjects.filter(e => e.id === pdPaymentTypeId && e.isGoodWill);
        if (paymentItem.length > 0) {
            rowItem.isGoodWill = true;
        } else {
            rowItem.isGoodWill = false;
            rowItem.goodWillPercent = 0;
            rowItem.goodWillAmt = 0;
        }
    }

    onChangeSource(rowItem, pdJobSourceId) {
        rowItem.pdJobSourceId = pdJobSourceId;
    }

    clearJobPart() {
        this.repairOrder.jobGroupId = null;
        this.repairOrder.jobItem = null;
        this.repairOrder.jobId = null;
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
            this.repairOrder.packageTypeId = null;
        }
    }

    onChangePart(partItem) {
        if (partItem) {
            this.repairOrder.partItem = partItem;
            this.repairOrder.servicePackageId = null;
            this.repairOrder.jobItem = null;
            this.repairOrder.jobId = null;
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
                    this.jobObjects = result.data.map(c => ({ label: c.code + " - " + c.description, value: c }));
                    this.jobObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
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
                    this.loadAppointmentDropdowlist(registrationNo);

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
        this.repairOrder.jobs = this.listRowItem;
        this.repairOrder.jobParts = this.listJobPart;
        this.repairOrder.jobsDeleted = this.listJobDeleted;
        this.repairOrder.partsDeleted = this.listPartDeleted;

        if (!this.isValidateRepairOrder(repairOrder))
            return

        if (this.repairOrder.id) {
            this.repairOrderService.updateRepairOrder(this.repairOrder).subscribe(result => {
                if (result != null && result.success) {
                    this.messagesService.success(result.message);
                    this.router.navigateByUrl('/repairOrder/Search');
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
                } else {
                    this.messagesService.error(result.message);
                }
            });
        }
    }

    listJobDeleted: any;
    async removeItemPackage(jobItem) {
        this.confirmationService.confirm({
            message: await this.translate.get('COMMON_CONFIRM_DELETE').toPromise(),
            accept: () => {
                if (jobItem.servicePackageId && this.listRowItem != null && this.listRowItem.filter(e => e.servicePackageId === jobItem.servicePackageId).length > 0) {
                    this.listRowItem = this.listRowItem.filter(item => item.servicePackageId !== jobItem.servicePackageId); // remove item
                    //remove children item
                    if (this.listJobPart.filter(e => e.id === jobItem.job.id).length > 0) {
                        this.listJobPart = this.listJobPart.filter(item => item.id !== jobItem.job.id);
                    }
                } else {
                    //remove job item
                    if (this.listRowItem != null && this.listRowItem.filter(e => e.job.id === jobItem.job.id).length > 0) {
                        this.listRowItem = this.listRowItem.filter(item => item.job.id !== jobItem.job.id);
                    }
                }

                this.listJobDeleted.push(jobItem.job.repairOrderJobId);
                this.onChangeQuantityPart(null, null);
            }
        });
    }

    listPartDeleted: any;
    async removeItemJob(jobItem) {
        this.confirmationService.confirm({
            message: await this.translate.get('COMMON_CONFIRM_DELETE').toPromise(),
            accept: () => {
                if (jobItem.id && this.listJobPart != null && this.listJobPart.filter(e => e.id === jobItem.id).length > 0) {
                    this.listJobPart = this.listJobPart.filter(item => item.id !== jobItem.id); // remove item
                } else {
                    //remove children item
                    if (this.listJobPart.filter(e => e.part.id === jobItem.part.id).length > 0) {
                        this.listJobPart = this.listJobPart.filter(item => item.part.id !== jobItem.part.id);
                    }
                }

                this.listPartDeleted.push(jobItem.id);
                this.onChangeQuantityPart(null, null);
            }
        });
    }

    isValidateRepairOrder(repairOrder) {
        if (!repairOrder)
            return false;

        //validation service package and job
        if (this.listRowItem) {
            if (this.listRowItem != null && this.listRowItem.filter(e => e.job.pdComeBackJobId == null).length > 0) {
                this.messagesService.error("REPAIR_ORDER_COMEBACK_JOB_REQUIRED");
                return false;
            }
            if (this.listRowItem != null && this.listRowItem.filter(e => e.job.pdPaymentTypeId == null).length > 0) {
                this.messagesService.error("REPAIR_ORDER_PAYMENT_TYPE_REQUIRED");
                return false;
            }
            if (this.listRowItem != null && this.listRowItem.filter(e => e.job.pdJobSourceId == null).length > 0) {
                this.messagesService.error("REPAIR_ORDER_JOB_SOURCE_REQUIRED");
                return false;
            }
        }

        // validation list job part
        if (this.listJobPart) {
            if (this.listJobPart != null && this.listJobPart.filter(e => e.part.pdPartSourceId == null).length > 0) {
                this.messagesService.error("REPAIR_ORDER_PART_SOURCE_REQUIRED");
                return false;
            }
            if (this.listJobPart != null && this.listJobPart.filter(e => e.part.pdPaymentTypeId == null).length > 0) {
                this.messagesService.error("REPAIR_ORDER_PAYMENT_TYPE_REQUIRED");
                return false;
            }
        }

        return true;
    }
}