import { RepairOrder } from './../../repairOrder/models/repairOrder.model';
import { InvoiceService } from './../services/invoice.service';
import { TranslateService } from '@ngx-translate/core';
import { SortColumn } from './../../shared/models/sortColumn.model';
import { MessagesService } from './../../../commons/message.utils';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Message } from 'primeng/components/common/api';
import { LazyLoadEvent } from "primeng/primeng";
import { SelectItem } from "primeng/components/common/selectitem";

declare var $: any;

@Component({
    selector: "invoice-Search",
    templateUrl: './searchInvoice.component.html',
    styleUrls: ['./searchInvoice.style.css']
})

export class InvoiceSearchComponent implements OnInit {
    private msgs: Message[];
    pageSizeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    invoiceSearch: any;
    invoice: any;
    sortedColumn: SortColumn;
    private obj;
    private invoiceList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(
        private invoiceService: InvoiceService, private router: Router,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService,
        private messagesService: MessagesService,
        private translate: TranslateService) {
        this.msgs = [];
    }

    ngOnInit(): void {

        this.invoiceSearch = {};
        this.obj = {};
        this.invoiceList = [];
        this.sortedColumn = new SortColumn(null, true);
        //this.loadInvoice(1, this.constant.PAGE_SIZE_DEFAULT);
        //display message when user create or update
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });
    }

    resource: any;
    ngAfterViewInit(): void {
        //display item per page 
        this.resource = {};
        this.resource.pagingLabel = this.translate.get("PAGING_ITEM_PER_PAGE").subscribe((res: string) => {
            $('.ui-paginator-bottom').append('<span>' + res + '</span>');
        });
    }

    loadInvoiceLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);
            this.invoiceList = [];
            this.loadInvoice(currentPage, pageSize);
        }, 250);
    }

    convertSortFilterModel(event) {
        if (this.invoiceSearch == null) {
            this.invoiceSearch = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.invoiceSearch.invoiceNo = filters.invoiceNo ? filters.invoiceNo.value : null;
                this.invoiceSearch.invoiceDate = filters.invoiceDate ? filters.invoiceDate.value : null;
                this.invoiceSearch.status = filters.status ? filters.status.value : null;
                this.invoiceSearch.customerName = filters.customerName ? filters.customerName.value : null;
                this.invoiceSearch.registrationNo = filters.registrationNo ? filters.registrationNo.value : null;
                this.invoiceSearch.roNo = filters.roNo ? filters.roNo.value : null;
                this.invoiceSearch.roDate = filters.roDate ? filters.roDate.value : null;
                this.invoiceSearch.totalAfterTaxAmt = filters.totalAfterTaxAmt ? filters.totalAfterTaxAmt.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    loadInvoice(curentPage: number, pageSize: number) {
        this.invoiceService
            .getInvoices(curentPage, pageSize, this.invoiceSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {


                if (result != null && result.data != null && result.data.rows != null) {
                    this.invoiceList = [];
                    result.data.rows.forEach(element => {
                        this.obj = {};
                        this.obj.id = element.id;
                        this.obj.invoiceNo = element.code;
                        this.obj.invoiceDate = element.createdDateTime;
                        this.obj.status = element.PDInvoiceStatus.code;
                        this.obj.customerName = element.RepairOrderMaster.VehicleCustomer.Customer.name;
                        this.obj.registrationNo = element.RepairOrderMaster.VehicleCustomer.registrationNo;
                        this.obj.roNo = element.RepairOrderMaster.code;
                        this.obj.roDate = element.RepairOrderMaster.dateTimeIn;
                        this.obj.totalAfterTaxAmt = element.totalAfterTaxAmt;
                        this.invoiceList.push(this.obj);
                    })
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
    }

    onClickAddUpdate(id: number): void {
        this.router.navigateByUrl('/invoice/Update/' + id);
    }
}