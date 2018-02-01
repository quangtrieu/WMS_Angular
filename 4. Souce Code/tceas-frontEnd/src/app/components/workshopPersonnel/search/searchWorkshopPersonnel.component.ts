import { Component, OnInit } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { WorkShopPersonnelService } from "../services/workShopPersonnel.service";
import { LazyLoadEvent } from "primeng/primeng";
declare var $: any;
@Component({
    selector : "workshopPersonnel-Search",
    templateUrl : './searchWorkshopPersonnel.component.html',
    styleUrls:['./searchWorkshopPersonnel.style.css']
})

export class WorkshopPersonnelSearchComponent implements OnInit{

    pageSizeObjects: Array<any>;
    selectedPageSize: any;
    workPersonnel: any;
    sortedColumn: SortColumn;

    // array of all items to be paged
    private workPersonnelList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(private workShopPersonnelService: WorkShopPersonnelService, private router: Router,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService) { }

    ngOnInit(): void {
         this.workPersonnel = {};
        this.sortedColumn = new SortColumn(null, true);
        this.loadDropdowlistStatus();
    }
    statusObjects: Array<any>;
    loadDropdowlistStatus() {
        this.statusObjects = [];
        this.statusObjects.push({ label: this.constant.All_STATUS, value: null });
        this.statusObjects.push({ label: this.constant.YES, value: '1' });
        this.statusObjects.push({ label: this.constant.NO, value: '0' });
    }

    loadWPLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            // this.convertSortFilterModel(event);
            this.workPersonnelList = [];
            this.loadWorkPersonnel(currentPage, pageSize);
        }, 250);
    }

    loadWorkPersonnel(curentPage: number, pageSize: number) {
        this.slimLoadingBarService.start(() => { });
        this.workShopPersonnelService
            .getworkShopPersonnels(this.pager.currentPage, pageSize, this.workPersonnel, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.workPersonnelList = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalPages = totalPages;
                    
                    this.workPersonnelList.forEach(element => {
                        element.role = {}
                        var subString: string = "";
                        element.EmployeeRoles.forEach(element1 => {
                            subString = subString + element1.PDEmployeeRole.description + ", "
                        })
                        element.role = subString.slice(0, -1);
                    });
                    this.slimLoadingBarService.complete();
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                    console.log(result)
                }
            });
    }

}