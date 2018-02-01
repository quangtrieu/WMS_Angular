import { ServiceHistoryComponent } from './../../repairOrder/serviceHistory/serviceHistory.component';
import { AppConfig } from './../../../config/app.config';
import { AppointmentItem } from './../models/appointment.item.model';
import { RepairOrderService } from './../../repairOrder/services/repairOrder.service';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { MessagesService } from './../../../commons/message.utils';
import { Constants } from './../../../config/app.constant';
import { JobFulfilmentService } from './../../jobFulfilment/services/jobFulfilment.service';
import { ServicePackageService } from './../../servicePackage/services/servicePackage.service';
import { JobPartService } from "../../shared/services/jobPart.service";
import { PartMasterService } from './../../partMaster/services/partMaster.service';
import { JobCodeService } from './../../jobCode/services/jobCode.service';
import { JobSectionService } from './../../jobSection/services/jobSection.service';
import { JobGroupService } from './../../jobGroup/services/jobGroup.service';
import { Message, ConfirmationService } from 'primeng/primeng';
import { Utils } from './../../../commons/app.utils';
import { AppointmentModel, TimeSlotDetailModel } from './../models/appointment.model';
import { VehicleCustomerService } from './../../shared/services/vehicleCustomer.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from "../services/appointment.service";
import { TimeSlotSetupService } from "../../timeSlotSetup/services/timeSlotSetup.service";
import { JobPartItem } from "../models/jobPart.item.model";
declare var $: any;

@Component({
    selector: 'appointment-addUpdate',
    templateUrl: './addUpdateAppointment.component.html',
    styleUrls: ['./addUpdateAppointment.style.css'],
    providers: [AppointmentService, RepairOrderService, TimeSlotSetupService, JobGroupService, JobCodeService, JobSectionService, PartMasterService, ServicePackageService, VehicleCustomerService,
        JobPartService, JobFulfilmentService]
})

export class AddUpdateAppointmentComponent implements OnInit {
    id: number = null;
    appointment: AppointmentModel = new AppointmentModel()
    selectedTimeSlotDetail: any = {};
    serviceAdvisors: any = [];

    sub: any;
    isProcessing = false;
    partSelected: any;
    selected: any;
    repairOrderBay: any;
    msgs: Message[];
    serviceHistories : any = [];

    @ViewChild('serviceHistory') serviceHistoryComponent: ServiceHistoryComponent;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private appointmentService: AppointmentService,
        private repairOrderService: RepairOrderService,
        private timeSlotSetupService: TimeSlotSetupService,
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
        private appConfig: AppConfig,
        private utils: Utils) { }

    ngOnInit() {
        this.appointment.isUpdate = false;
        this.appointment.totalLabourCharge = 0;
        this.appointment.totalPartAmt = 0;
        this.appointment.timeSlotDetail = new TimeSlotDetailModel();
        this.listJobDeleted = [];
        this.listPartDeleted = [];
        this.msgs = [];
        this.sub = this.route.params.subscribe(params => {
            this.id = (params['id'] != undefined) ? params['id'] : null;
        });

        if (this.id != null) {
            this.bindAppointmentById(this.id);
        } else {
            this.loadPackageTypeDropdowlist();
            this.loadJobGroupDropdowlist();
            this.loadComebackJobDropdowlist();
            this.loadJobSourceDropdowlist();
            this.loadPartSourceDropdowlist();
            this.loadPaymentTypeDropdowlist();
            this.loadServiceAdvisorDropdowlist();
            // init default value for dropdowlist
            this.initDefaultForDropdowlist();
        }

        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        this.clearDropdowValue();
    }

    clearDropdowValue() {
        this.appointment.partItem = null;
        this.appointment.jobItem = null;
        this.appointment.partItem = null;
        this.appointment.partId = null;
        this.appointment.jobId = null;
        this.appointment.servicePackage = null;
        this.appointment.servicePackageId = null;
        this.appointment.packageTypeId = null;
        this.appointment.pdJobTypeId = null;
        this.appointment.jobGroupId = null;
    }

    initDefaultForDropdowlist() {
        this.servicePackageObjects = [];
        this.jobObjects = [];
        this.partObjects = [];

        this.servicePackageObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
        this.jobObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
        this.partObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
    }

    async loadServiceAdvisorDropdowlist() {
        var result = await this.appointmentService.getAllServiceAdvisor(0, Number.MAX_SAFE_INTEGER, null);
        this.serviceAdvisors = result.data != null ? result.data.rows : [];
    }
   
    bindNewVehicleProfile(vehicle): void {
        if (vehicle) {
            let registrationNo = vehicle.substr(0, vehicle.indexOf("_"));
            this.appointment.registrationNo = registrationNo;
            this.bindInformationByRegistrationNo(registrationNo);
        }
    }

    bindAppointmentById(id) {
        this.slimLoadingBarService.start(() => { });
        Observable.forkJoin(
            this.repairOrderService.getAllComeBackJob().map((res: any) => res),
            this.repairOrderService.getAllJobSource().map((res: any) => res),
            this.repairOrderService.getAllPartSource().map((res: any) => res),
            this.repairOrderService.getAllPaymentType().map((res: any) => res),
            this.appointmentService.getFullAppointmentById(this.id).map((res: any) => res)
        ).subscribe(data => {
            this.jobTypeObjects = [];
            this.jobSourceObjects = [];
            this.partSourceObjects = [];
            this.paymentTypeObjects = [];

            this.jobTypeObjects = data[0].success ? this.setDataForDropdowlist(data[0].data) : [];
            this.jobSourceObjects = data[1].success ? this.setDataForDropdowlist(data[1].data) : [];
            this.partSourceObjects = data[2].success ? this.setDataForDropdowlist(data[2].data) : [];
            this.paymentTypeObjects = data[3].success ? this.setDataForDropdowlist(data[3].data) : [];

            if (data[4] && data[4].success) {
                this.appointment = data[4].data;
                this.appointment.isUpdate = true;
                var timeSlotDetail = data[4].data.TimeSlotDetail
                this.appointment.timeSlotDetail = new TimeSlotDetailModel();
                if(timeSlotDetail){
                    this.appointment.timeSlotDetail.id = timeSlotDetail.id;
                    this.appointment.timeSlotDetail.timeSlotDate = this.utils.getDateOnly(new Date(this.appointment.timeSlotDate));
                    this.appointment.timeSlotDetail.timeSlotTime = timeSlotDetail.startTime;
                }
                var vehicleCustomer = this.appointment.VehicleCustomer;
                if (vehicleCustomer) {
                    this.setVehicleCustomer(vehicleCustomer);
                }
                if (this.appointment) {
                    this.setDataForGrid(this.appointment);
                }
                this.loadPackageTypeDropdowlist();
                this.loadJobGroupDropdowlist();
                this.loadServicePackage();
                this.loadJobDropdowlist();
                this.loadPartDropdowlist();
                this.loadServiceAdvisorDropdowlist();
                this.clearDropdowValue();
                this.loadServiceHistories();
                this.slimLoadingBarService.complete();
            }
        });
    }

    setDataForDropdowlist(listItem) {
        var newListItem = listItem.map(c => ({ label: c.code + " - " + c.description, value: c.id }));
        newListItem.unshift({ label: this.constant.SELECT_DEFAULT, value: null });

        return newListItem;
    }

    setDataForGrid(appointment) {
        if (appointment) {
            var resultJobType = $.extend(true, [], this.jobTypeObjects);
            var resultJobSource = $.extend(true, [], this.jobSourceObjects);
            var resultPartSource = $.extend(true, [], this.partSourceObjects);
            var resultPaymentType = $.extend(true, [], this.paymentTypeObjects);

            var appointmentJobs = appointment.AppointmentJobs;
            if (appointmentJobs) {
                appointmentJobs.forEach(item => {
                    var rowItem = new AppointmentItem();

                    rowItem.servicePackageId = (item.ServicePackageMaster) ? item.ServicePackageMaster.id : null;
                    rowItem.packageCode = (item.ServicePackageMaster) ? item.ServicePackageMaster.code : "";
                    rowItem.itemDescription = (item.ServicePackageMaster) ? item.ServicePackageMaster.description : "";
                    rowItem.job = (item.JobMaster) ? item.JobMaster : {};
                    //rowItem.job.appointmentJobId = item.id;
                    rowItem.job.labourCharge = item.labourCharge;
                    rowItem.job.discountPercent = item.discountPercent;
                    rowItem.job.subTotal = item.subTotal;

                    rowItem.job.pdComeBackJobId = item.pdComeBackJobId;
                    rowItem.job.pdPaymentTypeId = item.pdPaymentTypeId;
                    rowItem.job.pdJobSourceId = item.pdJobSourceId;

                    rowItem.listJobType = resultJobType;
                    rowItem.listJobSource = resultJobSource;
                    rowItem.listPaymentType = resultPaymentType;

                    this.listRowItem.push(rowItem);
                });
            }

            this.listJobPart = [];
            var appointmentParts = appointment.AppointmentParts;
            if (appointmentParts) {
                appointmentParts.forEach(item => {
                    var jobItem = item;
                    var partItem: any = {};

                    partItem.jobId = (item.JobMaster) ? item.JobMaster.id : null;
                    partItem.appointmentPartId = item.id;
                    partItem.partId = (item.PartMaster && item.PartMaster.id) ? item.PartMaster.id : 0
                    partItem.quantity = item.requestQty;
                    partItem.unitPrice = item.unitPrice;
                    partItem.code = (item.PartMaster && item.PartMaster.code) ? item.PartMaster.code : "";
                    partItem.description = (item.PartMaster && item.PartMaster.description) ? item.PartMaster.description : "";

                    partItem.listPartType = resultPartSource;
                    partItem.listPaymentType = resultPaymentType;

                    partItem.pdPartSourceId = item.pdPartSourceId;
                    partItem.pdPaymentTypeId = item.pdPaymentTypeId;

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

        var packageTypeId = this.appointment.packageTypeId;
        var vehicleVariantId = this.appointment.vehicleVariantId;
        var currentMilleage = this.appointment.currentMilleage;

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
                    this.paymentTypeObjects = result.data.map(c => ({ label: c.code + " - " + c.description, value: c.id }));
                    this.paymentTypeObjects.unshift({ label: this.constant.SELECT_DEFAULT, value: null });
                    this.slimLoadingBarService.complete();
                }
            });
    }

    workShopId = 1; //TODO: need change 
    partObjects: any;
    loadPartDropdowlist() {
        this.slimLoadingBarService.start(() => { });
        var vehicleVariantId = this.appointment.vehicleVariantId;
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

    isShowErrorQuantity: any;
    listRowItem = [];
    async onClickAdd() {
        var servicePackageId = (this.appointment.servicePackage) ? this.appointment.servicePackage.id : null;
        var jobId = (this.appointment.jobItem) ? this.appointment.jobItem.id : null;
        var partId = (this.appointment.partItem) ? this.appointment.partItem.id : null;

        if (servicePackageId && servicePackageId != null) {
            if (this.listRowItem != null && this.listRowItem.filter(e => e.servicePackageId === servicePackageId).length > 0) {
                this.messagesService.error("COMMON_RECORD_EXISTS");
                return;
            }
            var item = this.appointment.servicePackage;
            if (item != null) {
                this.addServicePackageToGrid(this.listRowItem, item);
                this.onChangeQuantityPart(null, null);
            }
        } else if (jobId && jobId != null) {
            if (this.listRowItem != null && this.listRowItem.filter(e => e.job.id === jobId).length > 0) {
                this.messagesService.error("COMMON_RECORD_EXISTS");
                return;
            }

            var vehicleVariantId = this.appointment.vehicleVariantId;
            if (vehicleVariantId == undefined) {
                this.messagesService.error("REPAIR_ORDER_ENTER_REGISTRATION_NO");
                $("#vehicleRegistrationNo").focus();
                return;
            }

            var result = await this.jobPartService.getByJobIdAndVariantId(jobId, vehicleVariantId.toString());
            if (result != null && result.data != null) {
                this.addJobPartToGrid(this.listRowItem, result.data);
            } else {
                var jobMaster = this.appointment.jobItem;
                this.addJobIntoGrid(this.listRowItem, null, jobMaster);
            }
            this.onChangeQuantityPart(null, null);
        } else if (partId && partId != null) {
            if (this.listJobPart != null && this.listJobPart.filter(e => e.part.id === partId).length > 0) {
                this.messagesService.error("COMMON_RECORD_EXISTS");
                return;
            }

            this.addPartIntoGrid(this.appointment.partItem);
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

    addPartIntoGrid(partItem) {
        var resultPartSource = $.extend(true, [], this.partSourceObjects);
        var resultPaymentType = $.extend(true, [], this.paymentTypeObjects);

        var jobPartItem = new JobPartItem();
        partItem.unitPrice = (partItem.unitPrice) ? partItem.unitPrice : 0;
        partItem.quantity = (this.appointment.quantity) ? this.appointment.quantity : 0;

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
        partItem.pdPaymentTypeId = (resultPaymentType && resultPaymentType[1].value) ? resultPaymentType[1].value : 0;
        partItem.pdPartSourceId = (resultPartSource && resultPartSource[1].value) ? resultPartSource[1].value : 0;

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

            var repairOrderItem = new AppointmentItem();

            repairOrderItem.job = item.JobMaster ? item.JobMaster : item;
            if (servicePackage) { // Case servicePackage
                repairOrderItem.servicePackageId = (servicePackage && servicePackage.id) ? servicePackage.id : null;
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
                    part.unitPrice = element.unitPrice;
                    part.quantity = element.quantity;
                    part.servicePackagePartId = element.id;

                    part.listPaymentType = resultPaymentType;
                    part.listPartType = resultPartSource;

                    //set default value 
                    part.pdPaymentTypeId = (resultPaymentType && resultPaymentType[0].value) ? resultPaymentType[0].value : 0;
                    part.pdPartSourceId = (resultPartSource && resultPartSource[0].value) ? resultPartSource[0].value : 0;

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
                        part.pdPaymentTypeId = (resultPaymentType && resultPaymentType[0].value) ? resultPaymentType[0].value : 0;
                        part.pdPartSourceId = (resultPartSource && resultPartSource[0].value) ? resultPartSource[0].value : 0;

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
            repairOrderItem.listJobType = resultJobType;
            repairOrderItem.listPaymentType = resultPaymentType;
            repairOrderItem.listJobSource = resultJobSource;

            //set default value 
            repairOrderItem.job.pdPaymentTypeId = (resultPaymentType && resultPaymentType[0].value) ? resultPaymentType[0].value : 0;
            repairOrderItem.job.pdJobSourceId = (resultJobSource && resultJobSource[0].value) ? resultJobSource[0].value : 0;
            repairOrderItem.job.pdComeBackJobId = (resultJobType && resultJobType[0].value) ? resultJobType[0].value : 0;

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
                    }
                });
            }

            this.appointment.totalLabourCharge = totalLabourCharge;
            this.appointment.totalPartAmt = totalPartAmt;
        }
    }

    onChangePackageType(packageTypeId) {
        if (packageTypeId) {
            this.appointment.packageTypeId = packageTypeId;

            this.clearJobPart();
            this.loadServicePackage();
        }
    }

    onChangeServicePackage(servicePackage) {
        if (servicePackage) {
            this.appointment.servicePackage = servicePackage;
            this.clearJobPart();
        }
    }

    onChangeJobType(jobItem, pdComeBackJobId) {
        jobItem.pdComeBackJobId = pdComeBackJobId;
    }

    onChangePaymentType(rowItem, pdPaymentTypeId) {
        rowItem.pdPaymentTypeId = pdPaymentTypeId;
    }

    onChangeSource(rowItem, pdJobSourceId) {
        rowItem.pdJobSourceId = pdJobSourceId;
    }

    clearJobPart() {
        this.appointment.jobGroupId = null;
        this.appointment.jobItem = null;
        this.appointment.jobId = null;
        this.appointment.partItem = null;
        this.appointment.partId = null;
        this.appointment.Qty = null;
    }

    onChangeJobGroup(jobGroupId) {
        if (jobGroupId) {
            this.appointment.jobGroupId = jobGroupId;
            this.loadJobDropdowlist();
            this.appointment.servicePackageId = null;
        }
    }

    onChangeJob(jobItem) {
        if (jobItem) {
            this.appointment.jobItem = jobItem;
            this.appointment.partItem = null;
            this.appointment.partId = null;
            this.appointment.servicePackageId = null;
            this.appointment.packageTypeId = null;
        }
    }

    onChangePart(partItem) {
        if (partItem) {
            this.appointment.partItem = partItem;
            this.appointment.servicePackageId = null;
            this.appointment.jobItem = null;
            this.appointment.jobId = null;
            this.appointment.pdJobTypeId = null;
            this.appointment.jobGroupId = null;
        }
    }

    onChangePartSource(partSourceId) {
        if (partSourceId) {
            this.appointment.partSourceId = partSourceId;
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
        var jobGroupId = this.appointment.jobGroupId != null ? this.appointment.jobGroupId : null;
        var vehicleVariantId = this.appointment.vehicleVariantId != null ? this.appointment.vehicleVariantId : null;

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

    findVehicleByRegNo($event) {
        var registrationNo = $event.target.value;
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
                } else {
                    this.resetVehicleCustomer();
                    $('#dialogVehicleProfileAdd-modal').modal('show');
                }
                this.loadServiceHistories();
                this.isProcessing = false;
                this.slimLoadingBarService.complete();                
            });
        this.isProcessing = false;
    }

    resetVehicleCustomer() {
        this.appointment.vehicleCustomerId = null;
        this.appointment.registrationNo = null;
        this.appointment.customerName = null;
        this.appointment.vinNo = null;
        this.appointment.engineNo = null;
        this.appointment.chassisNo = null;
        this.appointment.vehicleModel = null;
        this.appointment.mobilePhoneNo = null;
        this.appointment.idNo = null;
        this.appointment.mobilePhoneNo = null;
    }

    setVehicleCustomer(vehicleCustomer) {
        this.appointment.vehicleCustomerId = vehicleCustomer.id;
        this.appointment.registrationNo = vehicleCustomer.registrationNo;
        this.appointment.customerName = vehicleCustomer.Customer.name;
        this.appointment.vinNo = vehicleCustomer.Vehicle.vinNo;
        this.appointment.engineNo = vehicleCustomer.Vehicle.engineNo;
        this.appointment.chassisNo = vehicleCustomer.Vehicle.chassisNo;

        if (vehicleCustomer.Vehicle && vehicleCustomer.Vehicle.VehicleVariant) {
            this.appointment.vehicleVariantId = (vehicleCustomer.Vehicle.VehicleVariant.id) ? vehicleCustomer.Vehicle.VehicleVariant.id : "";
            if (vehicleCustomer.Vehicle.VehicleVariant.VehicleModel) {
                this.appointment.vehicleModel = (vehicleCustomer.Vehicle.VehicleVariant.VehicleModel.code) ? vehicleCustomer.Vehicle.VehicleVariant.VehicleModel.code : "";
            }
        }
    }

    loadServiceHistories() {
         this.serviceHistoryComponent.loadServiceHistories(this.appointment.vehicleCustomerId);
    }

    // TODO
    cancel() {
        this.router.navigate(['/appointment/Search']);
    }

    openAddTimeSlotV2AppoimentModal() {
        this.selectedTimeSlotDetail = this.appointment.timeSlotDetail;
        this.selectedTimeSlotDetail.workShopId = this.appointment.workShopId;
        $('#addTimeSlotV2Appointment-modal').modal('show');
    }

    timeSlotUpdatedEvent(timeSlotDetail: any) {
        var selectedTimeSlotDetail = new TimeSlotDetailModel();
        selectedTimeSlotDetail.id = timeSlotDetail.id;
        selectedTimeSlotDetail.timeSlotDate = this.utils.getDateOnly(new Date(timeSlotDetail.timeSlotDate));
        selectedTimeSlotDetail.timeSlotTime = timeSlotDetail.timeSlotTime;
        selectedTimeSlotDetail.workShopId = timeSlotDetail.workShopId;
        this.appointment.workShopId = timeSlotDetail.workShopId; 
        this.appointment.timeSlotDetail = selectedTimeSlotDetail;
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

    isValidateAppointment(appointment) {
        if (!appointment)
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

    addUpdate(form: any) {
        form._submitted = true;
        if (form.valid) {
            this.appointment.jobs = this.listRowItem;
            this.appointment.jobParts = this.listJobPart;

            if (!this.isValidateAppointment(this.appointment))
                return

            if (this.appointment.id) {
                this.appointmentService.updateAppointment(this.appointment).subscribe(result => {
                    if (result != null && result.success) {
                        this.messagesService.success(result.message);
                        this.router.navigate(['/appointment/Search']);
                    }else{
                        this.messagesService.error(result.message);
                    }
                });
            } else {
                this.appointmentService.addAppointment(this.appointment).subscribe(result => {
                    if (result != null && result.success) {
                        this.messagesService.success(result.message);
                        this.router.navigate(['/appointment/Search']);
                    } else {
                        this.messagesService.error(result.message);
                    }
                });
            }
        }
    }
}