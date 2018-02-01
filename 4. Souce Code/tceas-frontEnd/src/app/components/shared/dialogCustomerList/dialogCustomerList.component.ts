import { Customer } from './customer.model';
import { CustomerService } from './../../customer/services/customer.service';
import { SortColumn } from './../models/sortColumn.model';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { AppState } from "../../../app.service";
import { LazyLoadEvent } from "primeng/primeng";
import { TranslateService } from '@ngx-translate/core';

declare const $: any;

@Component({
    selector: "dialogCustomer-list",
    templateUrl: './dialogCustomerList.component.html',
    styleUrls: ['./dialogCustomerList.style.css']
})

export class DialogCustomerListComponent implements OnInit {

    @Input() isAddCustomer: boolean;

    @Output() bindCustomer: EventEmitter<string> = new EventEmitter<string>();
    @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

    // private variable
    pageSizeObjects: Array<any>;
    typeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    customer: any;
    customerSelected: any;
    sortedColumn: SortColumn;
    customerSearch: any;

    // array of all items to be paged
    private customerList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalRecords: 0,
    };

    constructor(public appState: AppState, private customerService: CustomerService,
        private translate: TranslateService,
        private constant: Constants, private pagerUtils: PagerUtils) { }

    ngOnInit(): void {
        this.customerSearch = {};
        this.customerSelected = {};
        this.sortedColumn = new SortColumn(null, true);
        $('#dialogCustomerList-modal').on('shown.bs.modal', () => {
           // this.setPage(1);
        });
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
        if (this.customerSearch == null) {
            this.customerSearch = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.customerSearch.code = filters.code ? filters.code.value : null;
                this.customerSearch.name = filters.name ? filters.name.value : null;
                this.customerSearch.idNumber = filters.idNumber ? filters.idNumber.value : null;
                this.customerSearch.contact = filters.contact ? filters.contact.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    resource: any;
    ngAfterViewInit(): void {
        //display item per page 
        this.resource = {};
        this.resource.pagingLabel = this.translate.get("PAGING_ITEM_PER_PAGE").subscribe((res: string) => {
            $('.ui-paginator-bottom').append('<span>' + res + '</span>');
        });
    }

    // loadCustomerList() {
    //     this.customerService
    //         .getAll(this.customer, this.sortedColumn, this.pager.currentPage, this.pager.pageSize)
    //         .retry(3)
    //         .subscribe(result => {
    //             if (result.success) {
    //                 this.customerList = result.data.rows;
    //                 var totalPages = result.data.count;
    //                 this.pager.totalPages = totalPages;
    //                 this.pager = this.pagerUtils.getPager(totalPages, this.pager.currentPage, this.pager.pageSize);
    //                 this.sortedColumn.isAsc = this.sortedColumn.isAsc ? false : true;
    //             } else {
    //                 //Todo: show notify for message response
    //             }
    //         }
    //         );
    // }

    loadCustomerList(curentPage: number, pageSize: number) {
        this.customerService
            
            .getAll(curentPage, pageSize, this.customerSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.customerList = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
    }

    // setPage(curentPage: number) {
    //     this.pager.currentPage = curentPage;
    //     this.loadCustomerList();
    // }

    // loadDropdownPageSize() {
    //     this.pageSizeObjects = [{ id: 1, text: 10 }, { id: 2, text: 20 }, { id: 3, text: 30 }, { id: 4, text: 50 }];
    //     this.selectedPageSize = this.pageSizeObjects[0];
    // }

    // loadDropdownStatus() {
    //     this.typeObjects = [{ id: 1, text: "" }, { id: 2, text: this.constant.INDIVIDUAL }, { id: 3, text: this.constant.CORPORATE }];
    //     this.statusObjects = [{ id: 1, text: "" }, { id: 2, text: this.constant.YES }, { id: 3, text: this.constant.NO }];
    // }

    // public onChangePageSize(e: any): void {
    //     this.selectedPageSize = this.pageSizeObjects[e.value - 1];
    //     if (this.selectedPageSize != null) {
    //         this.pager.pageSize = this.selectedPageSize.text;
    //         this.pager.currentPage = 1;
    //         this.loadCustomerList();
    //     }
    // }

    // public keydownSearch(event: any) {
    //     if (event.keyCode == 13) {
    //         this.loadCustomerList();
    //     }
    // }

    // public onSortColumn(columnName: String, isAsc: Boolean) {
    //     this.sortedColumn = new SortColumn(columnName, isAsc);
    //     this.sortedColumn.classActive = isAsc ? 'sorting_asc' : 'sorting_desc';

    //     this.pager.currentPage = 1;
    //     this.loadCustomerList();
    // }

    onAddCustomer() {
        $('#dialogCustomerAdd-modal').modal('show');
        $('#dialogCustomerList-modal').modal('hide');
    }

    onCustomerSelected() {
        
        let objCustomerSelected = this.customerSelected.id + "_" + this.customerSelected.name;
        if(!this.isAddCustomer)
            objCustomerSelected += "_" + this.customerSelected.idNo + "_" + this.customerSelected.mobile;
        this.bindCustomer.emit(objCustomerSelected);
        this.customerSelected = {};
        $('#dialogCustomerList-modal').modal('hide');        
    }

    onClickCustomerSelected(id, name, idNumber, contact) {
        this.customerSelected.id = id;
        this.customerSelected.name = name;
        this.customerSelected.idNumber = idNumber;
        this.customerSelected.contact = contact;
        let objCustomerSelected = this.customerSelected.id + "_" + this.customerSelected.name;
        if(!this.isAddCustomer)
            objCustomerSelected += "_" + this.customerSelected.idNumber + "_" + this.customerSelected.contact;
        this.bindCustomer.emit(objCustomerSelected);
        this.customerSelected = {};
        $('#dialogCustomerList-modal').modal('hide');        
    }

    onCloseDialog() {
        this.closeDialog.emit(false);
    }

    onSelectedRow(id, name, idNo, mobile) {
        this.customerSelected.id = id;
        this.customerSelected.name = name;
        this.customerSelected.idNo = idNo;
        this.customerSelected.mobile = mobile;
    }

}