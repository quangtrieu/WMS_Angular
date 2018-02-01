import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Import } from "../../shared/models/import.model";
import { TranslateService } from '@ngx-translate/core';
import { DataTableParam, DataTableSource } from "../../../commons/datatable.utils";
import { CustomerService } from "../services/customer.service";
import { SearchViewModel } from "../../shared/models/searchView.model";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { PagerUtils } from "../../../commons/pager.utils";
import { Constants } from "../../../config/app.constant";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { MessagesService } from './../../../commons/message.utils';
import { Message } from 'primeng/components/common/api';
import { LazyLoadEvent } from "primeng/primeng";

declare var $: any;

@Component({
    selector: "searchCustomer-Search",
    templateUrl: './searchCustomer.component.html',
    styleUrls: ['./searchCustomer.style.css']
})

export class SearchCustomerComponent implements OnInit, AfterViewInit {

    @ViewChild('modalDelete')
    modalDelete: ModalComponent;
    private msgs: Message[];
    pageSizeObjects: Array<any>;
    typeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    customer: any;
    sortedColumn: SortColumn;

    // array of all items to be paged
    private customerList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalRecords: 0,
    };

    constructor(private router: Router, private customerService: CustomerService,
        private constant: Constants, private pagerUtils: PagerUtils,
        private messagesService: MessagesService,
        private translate: TranslateService,
        private slimLoadingBarService: SlimLoadingBarService) { }

    ngOnInit(): void {
        this.customer = {};
        this.sortedColumn = new SortColumn(null, true);
        this.loadCustomerList(1, this.constant.PAGE_SIZE_DEFAULT);

        //display message when user create or update
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        //reload data when user create or update
        this.messagesService.loadData.subscribe((isLoadMain: boolean) => {
            if (isLoadMain) {
                this.loadCustomerList(1, this.constant.PAGE_SIZE_DEFAULT);
            }
        });
        this.loadDropdowlistStatus();
    }

    resource: any;
    ngAfterViewInit(): void {
        //display item per page 
        this.resource = {};
        this.resource.pagingLabel = this.translate.get("PAGING_ITEM_PER_PAGE").subscribe((res: string) => {
            $('.ui-paginator-bottom').append('<span>' + res + '</span>');
        });
    }

    loadCustomerList(curentPage: number, pageSize: number) {
        this.customerService
            .getAll(curentPage, pageSize, this.customer, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.customerList = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
    }

    loadDropdowlistStatus() {
        this.statusObjects = [];
        this.statusObjects.push({ label: this.constant.All_STATUS, value: null });
        this.statusObjects.push({ label: this.constant.YES, value: '1' });
        this.statusObjects.push({ label: this.constant.NO, value: '0' });
    }

    loadCustomerLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);

            this.loadCustomerList(currentPage, pageSize);
        }, 250);
    }

    convertSortFilterModel(event) {
        if (this.customer == null) {
            this.customer = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.customer.code = filters.code ? filters.code.value : null;
                this.customer.name = filters.name ? filters.name.value : null;
                this.customer.idNumber = filters.idNumber ? filters.idNumber.value : null;
                this.customer.contact = filters.contact ? filters.contact.value : null;
                this.customer.status = filters.status ? filters.status.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }


    onClickAddUpdate(customer: any): void {
        if (this.customer != null) {
            this.customer.isUpdate = true;
        }
    }

    
    // delete customer by click button on row
    onDelete(info: any): void {
        var listValue = "";
        for (let element of $('.chk:checkbox:checked')) {
            listValue += element.value + ",";
        }
        listValue = listValue.substring(0, listValue.lastIndexOf(","));
        if (listValue) {
            $("#hdCustomerId").val(listValue);
            this.modalDelete.open();
        }
    }

}