import { Message } from 'primeng/primeng';
import { MessagesService } from './../../../commons/message.utils';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { RepairOrderService } from "../services/repairOrder.service";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { stringify } from "@angular/core/src/util";
declare var $: any;

@Component({
    selector: "RO-Search",
    templateUrl: './searchRO.component.html',
    styleUrls: ['./searchRO.style.css'],
    providers: []
})

export class ROSearchComponent implements OnInit {

    pageSizeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    repairOrder: any;
    isLoadingData = false;
    sortedColumn: SortColumn;
    private msgs: Message[];

    // array of all items to be paged
    private repairOrderList: any[];
    private obj;

    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(private router: Router,
        private constant: Constants, private pagerUtils: PagerUtils,
        private repairOrderService: RepairOrderService,
        private messagesService: MessagesService,
        private slimLoadingBarService: SlimLoadingBarService) {

    }

    ngOnInit(): void {
        this.repairOrder = {};
        this.obj = {};
        this.repairOrderList = [];
        this.sortedColumn = new SortColumn(null, false);
        this.setPage(1);
        this.loadDropdownPageSize();

        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });
    }

    loadRepairOrder(curentPage: number) {
        this.repairOrderList = []
        this.slimLoadingBarService.start(() => { });
        this.repairOrderService
            .getRepairOrder(this.pager.currentPage, this.pager.pageSize, this.repairOrder, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null) {
                    result.data.rows.forEach(element => {
                        this.obj = {};
                        this.obj.id = element.id;
                        this.obj.roNo = element.code;
                        this.obj.roDate = element.createdDateTime;
                        this.obj.status = element.statusId;
                        this.obj.customerName = element.VehicleCustomer.Customer.name;
                        this.obj.registrationNo = element.VehicleCustomer.registrationNo;
                        this.obj.vehivleModelDesc = element.VehicleCustomer.Vehicle.VehicleVariant.VehicleModel.description;
                        if (element.Appointment != null) {
                            this.obj.appointmentNo = element.Appointment.appointmentNo;
                            this.obj.appointmentDate = element.Appointment.createdDateTime;
                        } else {
                            this.obj.appointmentNo
                            this.obj.appointmentDate
                        }

                        // this.obj.roNo = element.code;
                        // this.obj.roNo = element.code;
                        // this.obj.roNo = element.code;
                        this.repairOrderList.push(this.obj);
                    })

                    var totalPages = result.data.count;
                    this.pager.totalPages = totalPages;

                    this.pager = this.pagerUtils.getPager(totalPages, curentPage, this.pager.pageSize);
                    this.slimLoadingBarService.complete();
                    this.sortedColumn.isAsc = this.sortedColumn.isAsc ? false : true;
                }
            });
    }

    setPage(curentPage: number) {
        this.pager.currentPage = curentPage;
        this.loadRepairOrder(curentPage);
        console.log(curentPage)
    }

    loadDropdownPageSize() {
        this.pageSizeObjects = [{ id: 1, text: 10 }, { id: 2, text: 20 }, { id: 3, text: 30 }, { id: 4, text: 50 }];
        this.selectedPageSize = this.pageSizeObjects[0];
    }

    public onChangePageSize(e: any): void {
        this.selectedPageSize = this.pageSizeObjects[e.value - 1];
        if (this.selectedPageSize != null) {
            this.pager.pageSize = this.selectedPageSize.text;
            this.pager.currentPage = 1;
            this.loadRepairOrder(1);
        }
    }
}