import { GoodsReceivingService } from "../services/goodsReceiving.service";
import { MessagesService } from './../../../commons/message.utils';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { Message } from 'primeng/components/common/api';
import { LazyLoadEvent } from "primeng/primeng";
import { SelectItem } from "primeng/components/common/selectitem";

declare var $: any;

@Component({
    selector: "grn-search",
    templateUrl: './search.component.html',
    styleUrls: ['./search.style.css']
})

export class GoodsReceivingSearchComponent implements OnInit {
    private msgs: Message[];
    // private variable
    pageSizeObjects: Array<any>;
    typeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    grnSearch: any;
    sortedColumn: SortColumn;
    private obj;
    // array of all items to be paged
    private grnList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(
        private service: GoodsReceivingService, private router: Router,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService,
        private messagesService: MessagesService) {
        this.msgs = [];
    }

    ngOnInit(): void {
        this.grnSearch = {};
        this.obj = {};
        this.grnList = [];
        this.sortedColumn = new SortColumn(null, true);

        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });
    }

    loadGRNLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);
            this.grnList = [];
            this.loadGRN(currentPage, pageSize);
        }, 250);
    }

    convertSortFilterModel(event) {
        if (this.grnSearch == null) {
            this.grnSearch = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.grnSearch.invoiceNo = filters.invoiceNo ? filters.invoiceNo.value : null;
                this.grnSearch.invoiceDate = filters.invoiceDate ? filters.invoiceDate.value : null;
                this.grnSearch.status = filters.status ? filters.status.value : null;
                this.grnSearch.customerName = filters.customerName ? filters.customerName.value : null;
                this.grnSearch.registrationNo = filters.registrationNo ? filters.registrationNo.value : null;
                this.grnSearch.roNo = filters.roNo ? filters.roNo.value : null;
                this.grnSearch.roDate = filters.roDate ? filters.roDate.value : null;
                this.grnSearch.totalAfterTaxAmt = filters.totalAfterTaxAmt ? filters.totalAfterTaxAmt.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    loadGRN(curentPage: number, pageSize: number) {
        this.slimLoadingBarService.start(() => { });
        this.service
            .getGRNs(curentPage, pageSize, this.grnSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {

                debugger;
                if (result != null && result.data != null && result.data.rows != null) {
                    this.grnList = [];
                    result.data.rows.forEach(element => {
                        this.obj = {};
                        this.obj.id = element.id;
                        this.obj.grnNo = element.code;
                        this.obj.grnDate = element.createdDateTime;
                        this.obj.status = element.status;
                        this.obj.poNo = element.poNo;
                        this.obj.poDate = element.poDate;
                        this.obj.qty = 0;
                        element.GoodReceiveItems.forEach(item => {
                            this.obj.qty += item.ReceivedQty;
                        });
                        this.grnList.push(this.obj);
                    })
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
    }

    loadDropdownStatus() {
        this.typeObjects = [{ id: 1, text: "" }, { id: 2, text: this.constant.INDIVIDUAL }, { id: 3, text: this.constant.CORPORATE }];
        this.statusObjects = [{ id: 1, text: "" }, { id: 2, text: this.constant.YES }, { id: 3, text: this.constant.NO }];
    }
}