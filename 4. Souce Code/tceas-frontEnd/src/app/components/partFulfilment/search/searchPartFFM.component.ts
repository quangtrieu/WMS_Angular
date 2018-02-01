import { LazyLoadEvent } from 'primeng/primeng';
import { TranslateService } from '@ngx-translate/core';
import { MessagesService } from './../../../commons/message.utils';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { PagerUtils } from './../../../commons/pager.utils';
import { Constants } from './../../../config/app.constant';
import { Router } from '@angular/router';
import { SortColumn } from './../../shared/models/sortColumn.model';
import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { PartFulfillmentService } from '../services/partFulfillment.service';
import { Message } from 'primeng/components/common/api';

declare var $: any;

@Component({
    selector : "searchPartFFM-Search",
    templateUrl : './searchPartFFM.component.html',
    styleUrls:['./searchPartFFM.style.css']
})

export class SearchPartFFMComponent implements OnInit {
    private msgs: Message[];
    partFulfillSearch: any;
    sortedColumn: SortColumn;

    // array of all items to be paged
    private partFFList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(private router: Router, private repairOrderPartService: PartFulfillmentService,
        private constant: Constants, 
        private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService,
        private messagesService: MessagesService,
        private translate: TranslateService) { 
            this.msgs = [];
        }

    ngOnInit(): void {
        this.partFulfillSearch = {};
        this.sortedColumn = new SortColumn(null, true);

        //display message when user create or update
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        //reload data when user create or update
        this.messagesService.loadData.subscribe((isLoadMain: boolean) => {
            if (isLoadMain) {
                this.loadPartFFList(1, this.constant.PAGE_SIZE_DEFAULT);
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

    loadPartFulfillLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);

            this.loadPartFFList(currentPage, pageSize);
        }, 250);
    }
    convertSortFilterModel(event) {
        if (this.partFulfillSearch == null) {
            this.partFulfillSearch = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.partFulfillSearch.roNo = filters.roNo ? filters.roNo.value : null;
                this.partFulfillSearch.roDate = filters.roDate ? filters.roDate.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    loadPartFFList(curentPage: number, pageSize: number) {
        this.repairOrderPartService
            .getAll(curentPage, pageSize, this.partFulfillSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if(result.success) {
                    result.data.rows.forEach(element => {                      
                        element.roNo = element.RepairOrderMaster.code;
                        element.roDate = element.RepairOrderMaster.dateTimeIn;
                        element.registrationNo = element.RepairOrderMaster.VehicleCustomer.registrationNo;
                        element.estimateDeliveryTime = element.RepairOrderMaster.expectedDeliveryDateTime;
                        element.requestQty = element.requestQty;
                        element.fulfilledQty = element.fullfillQty;
                        element.latestFulfilmentNo = element.latestFullfilmentNo;
                        element.fulfilledDateTime = element.fullfilledDateTime;
                    });
                    this.partFFList = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                } else {
                    //Todo: show notify for message response
                }
            });
    }
    
}