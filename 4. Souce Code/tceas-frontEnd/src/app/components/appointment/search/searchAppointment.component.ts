import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { AppointmentService } from "../services/appointment.service";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { stringify } from "@angular/core/src/util";
import { LazyLoadEvent } from "primeng/primeng";
import { Utils } from "../../../commons/app.utils"

declare var $: any;

@Component({
    selector: 'appointment-search',
    templateUrl: './searchAppointment.component.html',
    styleUrls: ['./searchAppointment.style.css']
})

export class SearchAppointmentComponent implements OnInit {

    pageSizeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    appointment: any;
    isLoadingData = false;
    sortedColumn: SortColumn;

    // array of all items to be paged
    private appointmentList: any[];
    private obj;

    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(private router: Router,
        private constant: Constants, private pagerUtils: PagerUtils, private Utils: Utils,
        private appointmentService: AppointmentService,
        private slimLoadingBarService: SlimLoadingBarService) { }

    ngOnInit(): void {
        this.appointment = {};
        this.obj = {};
        this.appointmentList = [];
        this.sortedColumn = new SortColumn(null, false);

    }

    loadAppointmentLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);

            this.loadAppointment(currentPage, pageSize);
        }, 250);
    }

    convertSortFilterModel(event) {
        if (this.appointment == null) {
            this.appointment = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.appointment.code = filters.code ? filters.code.value : null;
                this.appointment.appointmentDate = filters.appointmentDate ? filters.appointmentDate.value : null;
                this.appointment.appointmentTime = filters.appointmentTime ? filters.appointmentTime.value : null;
                this.appointment.customer = filters.customer ? filters.customer.value : null;
                this.appointment.registrationNo = filters.registrationNo ? filters.registrationNo.value : null;
                this.appointment.registrationNo = filters.registrationNo ? filters.registrationNo.value : null;
                this.appointment.vehicle = filters.vehicle ? filters.vehicle.value : null;
                this.appointment.workshop = filters.workshop ? filters.workshop.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    onClickAddUpdate(id: number): void {
        this.router.navigateByUrl('/appointment/Update/' + id);
    }

    loadAppointment(curentPage: number, pageSize: number) {
        this.slimLoadingBarService.start(() => { });
        this.appointmentService
            .getAppointment(this.pager.currentPage, this.pager.pageSize, this.appointment, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null) {
                    this.appointmentList = [];
                    result.data.rows.forEach(element => {
                        this.obj = {};
                        this.obj.id = element.id;
                        this.obj.code = element.appointmentNo;
                        this.obj.appointmentDate = element.timeSlotDate;
                        this.obj.appointmentTime = element.TimeSlotDetail.startTime + ' - ' + element.TimeSlotDetail.endTime;
                        this.obj.customer = element.VehicleCustomer.Customer.name;
                        this.obj.registrationNo = element.VehicleCustomer.registrationNo;
                        this.obj.vehicle = element.VehicleCustomer.Vehicle.VehicleVariant.code;
                        this.obj.workshop = 'NVL';// element.Workshop.code;
                        this.appointmentList.push(this.obj);
                    })
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
    }
}