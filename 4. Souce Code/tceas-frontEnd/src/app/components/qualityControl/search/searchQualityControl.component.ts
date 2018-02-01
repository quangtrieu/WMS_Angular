import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { Constants } from "../../../config/app.constant";
import { QuantityControlService } from "../services/qualityControl.service";
import { Router } from "@angular/router";
import { PagerUtils } from "../../../commons/pager.utils";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { MessagesService } from "../../../commons/message.utils";
import { LazyLoadEvent } from "primeng/primeng";
declare var $: any;

@Component({
    selector: 'quanlity-control-search',
    templateUrl: './searchQualityControl.component.html',
    styleUrls: ['./searchQualityControl.style.css']
})

export class SearchQualityControlComponent implements OnInit {
    private msgs: Message[];
    pageSizeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    quantitySearch: any;
    invoice: any;
    sortedColumn: SortColumn;
    private obj;
    private quantityList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(private quantityControlService: QuantityControlService, private router: Router,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService,
        private messagesService: MessagesService) {
        this.msgs = [];
    }
    ngOnInit(): void {
        this.quantitySearch = {};
        this.obj = {};
        this.quantityList = [];
        this.sortedColumn = new SortColumn(null, true);
        //this.loadQC(1, this.constant.PAGE_SIZE_DEFAULT);
        //display message when user create or update
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });
    }

    loadQCLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);
            this.quantityList = [];
            this.loadQC(currentPage, pageSize);
        }, 250);
    }

    convertSortFilterModel(event) {
        if (this.quantitySearch == null) {
            this.quantitySearch = {};
        }

        // if (event != null) {
        //     var filters = event.filters;
        //     var sortField = event.sortField;

        //     if (filters != null) {
        //         this.quantitySearch.invoiceNo = filters.invoiceNo ? filters.invoiceNo.value : null;
        //         this.quantitySearch.invoiceDate = filters.invoiceDate ? filters.invoiceDate.value : null;
        //         this.quantitySearch.status = filters.status ? filters.status.value : null;
        //         this.quantitySearch.customerName = filters.customerName ? filters.customerName.value : null;
        //         this.quantitySearch.registrationNo = filters.registrationNo ? filters.registrationNo.value : null;
        //         this.quantitySearch.roNo = filters.roNo ? filters.roNo.value : null;
        //         this.quantitySearch.roDate = filters.roDate ? filters.roDate.value : null;
        //         this.quantitySearch.totalAfterTaxAmt = filters.totalAfterTaxAmt ? filters.totalAfterTaxAmt.value : null;
        //     }
        //     if (sortField != null) {
        //         var isAsc = event.sortOrder === 1 ? true : false;
        //         this.sortedColumn = new SortColumn(sortField, isAsc);
        //     }
        // }
    }

    loadQC(curentPage: number, pageSize: number) {
        this.slimLoadingBarService.start(() => { });
        this.quantityControlService
            .getAll(curentPage, pageSize, this.quantitySearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                

                if (result != null && result.data != null && result.data.rows != null) {
                    this.quantityList = [];
                    result.data.rows.forEach(element => {
                        this.obj = {};
                        this.obj.id = element.RepairOrderMaster.id;
                        this.obj.RONo = element.RepairOrderMaster.code;
                        this.obj.RODate = element.RepairOrderMaster.dateTimeIn;
                        this.obj.status = element.PDJobFulfilmentStatus == null ? " " : element.PDJobFulfilmentStatus.description;
                        this.obj.customerName = element.RepairOrderMaster.VehicleCustomer.Customer.name
                        this.obj.registrationNo = element.RepairOrderMaster.VehicleCustomer.registrationNo
                        this.quantityList.push(this.obj);
                    })

                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
                console.log(this.quantityList)
            });
    }

    onClickAddUpdate(id: number) {
        this.router.navigateByUrl('/qualityControl/Update/' + id);
    }
}