import { Utils } from './../../../commons/app.utils';
import { TranslateService } from '@ngx-translate/core';
import { SortColumn } from './../../shared/models/sortColumn.model';
import { MessagesService } from './../../../commons/message.utils';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { LocalPurchaseOrderService } from "../services/localPurchaseOrder.service";
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
    selector: "searchLPO-Search",
    templateUrl: './searchLPO.component.html',
    styleUrls: ['./searchLPO.style.css']
})

export class SearchLPOComponent implements OnInit, AfterViewInit {
    private msgs: Message[];
    statusObjects: Array<any>;
    localPOSearch: any;
    sortedColumn: SortColumn

    // array of all items to be paged
    private localPOList: any[];

    resource: any;

    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalRecords: 0,
    };

    constructor(
        private localPOService: LocalPurchaseOrderService, private router: Router,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService,
        private messagesService: MessagesService,
        private translate: TranslateService,
        private Utils: Utils, ) {
        this.msgs = [];
    }

    ngOnInit(): void {
        this.localPOSearch = {};
        this.sortedColumn = new SortColumn(null, true);
        // this.loadLocalPO(1, this.constant.PAGE_SIZE_DEFAULT);

        //display message when user create or update
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        //reload data when user create or update
        this.messagesService.loadData.subscribe((isLoadMain: boolean) => {
            if (isLoadMain) {
                this.loadLocalPO(1, this.constant.PAGE_SIZE_DEFAULT);
            }
        });
    }

    ngAfterViewInit(): void {
        //display item per page 
        this.resource = {};
        this.resource.pagingLabel = this.translate.get("PAGING_ITEM_PER_PAGE").subscribe((res: string) => {
            $('.ui-paginator-bottom').append('<span>' + res + '</span>');
        });
    }

    loadLocalPOLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);

            this.loadLocalPO(currentPage, pageSize);
        }, 250);
    }

    convertSortFilterModel(event) {
        if (this.localPOSearch == null) {
            this.localPOSearch = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.localPOSearch.roNo = filters.roNo ? filters.roNo.value : null;
                this.localPOSearch.roDate = filters.roDate ? filters.roDate.value : null;
                this.localPOSearch.registrationNo = filters.registrationNo ? filters.registrationNo.value : null;
                this.localPOSearch.subletName = filters.subletName ? filters.subletName.value : null;
                this.localPOSearch.lpoNo = filters.lPONO ? filters.lPONO.value : null;
                this.localPOSearch.lpoDate = filters.lPODate ? filters.lPODate.value : null;
                this.localPOSearch.paymentTerm = filters.paymentTerm ? filters.paymentTerm.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    private obj;
    loadLocalPO(curentPage: number, pageSize: number) {
        this.localPOService
            .getLocalPOs(curentPage, pageSize, this.localPOSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.localPOList = [];
                    result.data.rows.forEach(element => {
                        this.obj = {};
                        this.obj.id = element.id;
                        this.obj.lPONO = element.code;
                        this.obj.roNo = element.RepairOrderMaster.code;
                        this.obj.registrationNo = element.RepairOrderMaster.VehicleCustomer.registrationNo;
                        this.obj.lPODate = this.Utils.getDateFromDateTime(element.createdDateTime);
                        this.obj.paymentTerm = element.PDPaymentTerm.description;
                        this.obj.subletName = element.SubletMaster.subletName;
                        this.obj.roDate = this.Utils.getDateFromDateTime(element.RepairOrderMaster.dateTimeIn);
                        this.obj.subletInvoiceNo = '';
                        this.localPOList.push(this.obj);
                    })
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
    }
}