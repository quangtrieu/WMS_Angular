import { Component, OnInit } from '@angular/core';
import { WorkBayService } from "../services/workBay.service";
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { LazyLoadEvent } from 'primeng/primeng';
declare var $: any;

@Component({
    selector: "searchWorkbay-Search",
    templateUrl: './searchWorkBay.component.html',
    styleUrls: ['./searchWorkBay.style.css']
})

export class SearchWorkBayComponent implements OnInit {
    pageSizeObjects: Array<any>;
    selectedPageSize: any;
    workBay: any;
    sortedColumn: SortColumn;
    statusObjects: Array<any>;

    // array of all items to be paged
    private workBayList: any[];
    selectedWorkBay
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(
        private workBayService: WorkBayService, private router: Router,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService) {
    }

    ngOnInit(): void {
        this.workBay = {};
        this.selectedWorkBay = {}
        this.workBay.bayEmployee1 = {};
        this.workBay.bayEmployee2 = {};
        this.sortedColumn = new SortColumn(null, true);
        this.loadDropdowlistStatus();
    }

    loadDropdowlistStatus() {
        this.statusObjects = [];
        this.statusObjects.push({ label: this.constant.All_STATUS, value: null });
        this.statusObjects.push({ label: this.constant.YES, value: '1' });
        this.statusObjects.push({ label: this.constant.NO, value: '0' });
    }

    loadWBLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            // this.convertSortFilterModel(event);
            this.workBayList = [];
            this.loadWorkBay(currentPage, pageSize);
        }, 1000);
    }

    loadWorkBay(curentPage: number, pageSize: number) {
        this.slimLoadingBarService.start(() => { });
        this.workBayService
            .getworkBays(this.pager.currentPage, pageSize, this.workBay, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.workBayList = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalPages = totalPages;

                    this.pager = this.pagerUtils.getPager(totalPages, curentPage, this.pager.pageSize);
                    this.slimLoadingBarService.complete();
                    this.sortedColumn.isAsc = this.sortedColumn.isAsc ? false : true;
                }
            });
    }

    onClickAddUpdate(item: any) {
        $('#workbay-modal').modal();
        if (item) {
            this.workBayService.getById(item.id).retry(3)
                .subscribe(result => {
                    this.selectedWorkBay = result.data;
                    if (this.selectedWorkBay.BayEmployees[0]) {
                        this.selectedWorkBay.bayEmployee1 = this.selectedWorkBay.BayEmployees[0].Employee.id;
                    } else {
                        this.selectedWorkBay.bayEmployee1 = {}
                    }

                    if (this.selectedWorkBay.BayEmployees[1]) {
                        this.selectedWorkBay.bayEmployee2 = this.selectedWorkBay.BayEmployees[1].Employee.id;
                    } else {
                        this.selectedWorkBay.bayEmployee2 = {}
                    }

                    console.log(this.selectedWorkBay)

                })
        } else {
            this.selectedWorkBay = {}
            this.selectedWorkBay.PDJobType = {};
            this.selectedWorkBay.PDHoistType = {};
            this.selectedWorkBay.bayEmployee1 = {};
            this.selectedWorkBay.bayEmployee2;
        }
    }
    
}