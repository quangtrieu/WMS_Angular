import { TranslateService } from '@ngx-translate/core';
import { SortColumn } from './../../shared/models/sortColumn.model';
import { MessagesService } from './../../../commons/message.utils';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { VehicleMake } from "../models/vehicleMake.model";
import { VehicleMakeService } from "../services/vehicleMake.service";
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
    selector: "searchVehicleMake-Search",
    templateUrl: './searchVehicleMake.component.html',
    styleUrls: ['./searchVehicleMake.style.css']
})

export class SearchVehicleMakeComponent implements OnInit, AfterViewInit {

    private msgs: Message[];
    statusObjects: Array<any>;
    vehicleMakeSearch: any;
    vehicleMake: any;
    sortedColumn: SortColumn;

    brands: SelectItem[];
    // array of all items to be paged
    private vehicleMakeList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalRecords: 0,
    };

    constructor(
        private vehicleMakeService: VehicleMakeService, private router: Router,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService,
        private messagesService: MessagesService,
        private translate: TranslateService) {
        this.msgs = [];
    }

    ngOnInit(): void {
        this.vehicleMakeSearch = {};
        this.sortedColumn = new SortColumn(null, true);
        this.loadVehicleMake(1, this.constant.PAGE_SIZE_DEFAULT);

        //display message when user create or update
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        //reload data when user create or update
        this.messagesService.loadData.subscribe((isLoadMain: boolean) => {
            if (isLoadMain) {
                this.loadVehicleMake(1, this.constant.PAGE_SIZE_DEFAULT);
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


    loadDropdowlistStatus() {
        this.statusObjects = [];
        this.statusObjects.push({ label: this.constant.All_STATUS, value: null });
        this.statusObjects.push({ label: this.constant.YES, value: '1' });
        this.statusObjects.push({ label: this.constant.NO, value: '0' });
    }

    loadVehicleMakeLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);

            this.loadVehicleMake(currentPage, pageSize);
        }, 250);
    }

    convertSortFilterModel(event) {
        debugger;
        if (this.vehicleMakeSearch == null) {
            this.vehicleMakeSearch = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.vehicleMakeSearch.code = filters.code ? filters.code.value : null;
                this.vehicleMakeSearch.description = filters.description ? filters.description.value : null;
                this.vehicleMakeSearch.status = filters.status ? filters.status.value : null;
                this.vehicleMakeSearch.createdBy = filters.createdBy ? filters.createdBy.value : null;
                this.vehicleMakeSearch.updatedBy = filters.updatedBy ? filters.updatedBy.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    loadVehicleMake(curentPage: number, pageSize: number) {
        this.vehicleMakeService
            .getVehicleMakes(curentPage, pageSize, this.vehicleMakeSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.vehicleMakeList = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
    }

    onClickAddUpdate(id: number): void {
        this.vehicleMake = {};
        if (id == null) {
            this.vehicleMake.status = 1;
            this.messagesService.loadChildrenComponent(this.vehicleMake);
            $('#addUpdate-VehicleMake-modal').modal();
        } else {
            this.vehicleMake.id = id;
            this.vehicleMake.isUpdate = true;
            this.messagesService.loadChildrenComponent(this.vehicleMake);
            $('#addUpdate-VehicleMake-modal').modal();
        }
    }
}