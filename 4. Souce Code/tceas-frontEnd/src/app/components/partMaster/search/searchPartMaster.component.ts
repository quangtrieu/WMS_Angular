import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { PartMasterService } from "../services/partMaster.service";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { LazyLoadEvent } from 'primeng/primeng';
import { Utils } from '../../../commons/app.utils';

declare var $: any;

@Component({
    selector: "searchPartMaster-Search",
    templateUrl: './searchPartMaster.component.html',
    styleUrls: ['./searchPartMaster.style.css']
})

export class SearchPartMasterComponent implements OnInit {
    partDataTable: any;
    partList: any;
    @ViewChild('modalDelete')
    modalDelete: ModalComponent;

    pageSizeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    partMaster: any;
    isLoadingData = false;
    sortedColumn: SortColumn;

    // array of all items to be paged
    private partMasterList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };
    constructor(private router: Router,
        private constant: Constants,
        private appUtils: Utils,
        private pagerUtils: PagerUtils,
        private partMasterService: PartMasterService,
        private slimLoadingBarService: SlimLoadingBarService) { }

    ngOnInit(): void {
        this.partList = {};
        this.sortedColumn = new SortColumn(null, false);
        this.statusObjects = this.appUtils.loadDropdowlistStatus();
    }

    loadPartListLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;
            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);
            this.loadPartList(currentPage, pageSize);
        }, 250);
    }

    loadPartList(curentPage: number, pageSize: number) {
        this.partMasterService
            .getPartMaster(curentPage, pageSize, this.partList, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.partDataTable = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
    }

    convertSortFilterModel(event) {
        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.partList.code = filters.code ? filters.code.value : null;
                this.partList.description = filters.description ? filters.description.value : null;
                this.partList.status = filters.status ? filters.status.value : null;
                this.partList.JobGroup = filters.JobGroup ? filters.JobGroup.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    public onChangeStatus(e: any): void {
        var selectedStatus = this.statusObjects[e.value - 1];
        if (selectedStatus != null) {
            if (selectedStatus.text == "") {
                this.partMaster.status = null;
            } else {
                this.partMaster.status = (selectedStatus.text === this.constant.YES) ? 1 : 0;
            }

            this.pager.currentPage = 1;
            // this.loadPartMaster(1);
        }
    }


    // check all checkbox
    onCheckAll() {
        if ($('#chkAll').is(':checked')) {
            $('#chkAll').prop('checked', true);
            $('.chk').prop('checked', true);
        } else {
            $('#chkAll').prop('checked', false);
            $('.chk').prop('checked', false);
        }
    }

    // row checked 
    onRowChecked() {
        var totalChk = $('.chk').length;
        var totalChkChecked = $('.chk:checkbox:checked').length;
        if (totalChkChecked != totalChk) {
            $('#chkAll').prop('checked', false);
        } else {
            $('#chkAll').prop('checked', true);
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