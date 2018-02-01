import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { TimeSlotSetupService } from "../services/timeSlotSetup.service";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { Utils } from './../../../commons/app.utils';

declare var $: any;
import * as _ from "underscore";
import { IHashMap } from "../../shared/models/hashMap.model";

@Component({
    selector: "searchTimeSlotSetup-Search",
    templateUrl: './searchTimeSlotSetup.component.html',
    styleUrls: ['./searchTimeSlotSetup.style.css']
})

export class SearchTimeSlotSetupComponent implements OnInit {

    pageSizeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    timeslot: any;
    sortedColumn: SortColumn;
    timeSlotSpecialDay: any;
    baysPerSlot: any;

    // array of all items to be paged
    private timeslotList: any[];
    private timeSlotMasterList: any[];
    private compareTimeSlotList: any[];
    private listTimeSlotChange: any[];

    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(private timeSlotSetupService: TimeSlotSetupService, private router: Router, private Utils: Utils,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService) { }

    ngOnInit(): void {
        this.timeslot = {};
        this.timeSlotSpecialDay = {};
        this.baysPerSlot = null;
        this.sortedColumn = new SortColumn(null, true);
        this.listTimeSlotChange = [];

        this.loadTimeSlotMaster()
        this.setPage(1);
        this.loadDropdownPageSize();

    }

    loadTimeSlotMaster() {
        this.slimLoadingBarService.start(() => { });
        this.timeSlotSetupService.getTimeSlotMaster()
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.timeSlotMasterList = result.data.rows;
                    this.compareTimeSlotList = $.extend(true, [], this.timeSlotMasterList);
                    //console.log(result.data.rows)
                    this.baysPerSlot = this.timeSlotMasterList[0].baysPerSlot
                    this.slimLoadingBarService.complete();
                }
            })
    }

    loadTimeSlotSpecialDay(curentPage: number) {
        this.slimLoadingBarService.start(() => { });
        this.timeSlotSetupService
            .getTimeSlotSpecialDay(this.pager.currentPage, this.pager.pageSize, this.timeslot, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.timeslotList = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalPages = totalPages;
                    this.timeslotList.forEach(element => {
                        element.specialDay = this.Utils.getDateFromDateTime(element.specialDay.replace("Z", ""))
                    })

                    this.pager = this.pagerUtils.getPager(totalPages, curentPage, this.pager.pageSize);
                    this.slimLoadingBarService.complete();
                    this.sortedColumn.isAsc = this.sortedColumn.isAsc ? false : true;
                }
            });
    }

    //listen change and filter, 
    onChangeTimeSlot(timeSlot, index) {
        var timeSlotChange = this.listTimeSlotChange.filter(t => t.id == timeSlot.id);
        if (timeSlotChange != null) {
            this.compareTimeSlotList.forEach(item => {
                if (item.id == timeSlot.id) {
                    if (this.toSeconds(timeSlot.startTime) != this.toSeconds(item.startTime) ||
                        this.toSeconds(timeSlot.endTime) != this.toSeconds(item.endTime) ||
                        this.toSeconds(timeSlot.breakStartTime) != this.toSeconds(item.breakStartTime) ||
                        this.toSeconds(timeSlot.breakEndTime) != this.toSeconds(item.breakEndTime)) {
                        this.listTimeSlotChange[timeSlot.id] = timeSlot;
                    } else {
                        this.listTimeSlotChange = this.listTimeSlotChange.filter(e => e.id !== timeSlot.id);
                        //console.log(this.listTimeSlotChange);
                    }
                }
            });
            console.log(this.listTimeSlotChange);
        }
        else {
            timeSlotChange[0] = timeSlot;
        }
        console.log(this.listTimeSlotChange)
    }

    setPage(curentPage: number) {
        this.pager.currentPage = curentPage;
        this.loadTimeSlotSpecialDay(curentPage);
    }

    loadDropdownPageSize() {
        this.pageSizeObjects = [{ id: 1, text: 10 }, { id: 2, text: 20 }, { id: 3, text: 30 }, { id: 4, text: 50 }];
        this.selectedPageSize = this.pageSizeObjects[0];
    }

    //ad new special day
    addNew(timeSlotSpecialDay) {
        console.log(JSON.stringify(timeSlotSpecialDay))
        if (JSON.stringify(timeSlotSpecialDay) === JSON.stringify({})) {

        } else {
            this.timeSlotSetupService
                .addNewTimeSlotSpecialDay(timeSlotSpecialDay)
                .retry(3)
                .subscribe(result => {
                    this.loadTimeSlotSpecialDay(1);
                });
        }
    }


    addUpdate(timeChange) {
        //update time slot detail
        if (this.listTimeSlotChange.length != 0) {
            console.log(JSON.stringify(timeChange))
            // Update table time slot master 
            this.timeSlotSetupService
                .updateTimeSlotMaster(JSON.stringify(timeChange))
                .retry(3)
                .subscribe(result => {
                    console.log('done')
                    this.loadTimeSlotMaster()
                });

            // console.log(this.listTimeSlotChange)
            var newListTimeSlot = JSON.stringify(this.listTimeSlotChange.filter(e => e != null));
            this.timeSlotSetupService
                .updateTimeSlotDetail(newListTimeSlot)
                .retry(3)
                .subscribe(result => {
                    console.log('done')
                    this.loadTimeSlotMaster()
                });

            this.listTimeSlotChange = []
        }


    }

    //compare hour
    toSeconds(t) {
        var bits = t.split(':');
        return bits[0] * 3600 + bits[1] * 60;
    }
}