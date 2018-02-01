import { AppConfig } from './../../../../config/app.config';
import { JPCBStatusEnum } from './../../../../commons/enums/jPCBStatusEnum';
import { Observable } from 'rxjs/Observable';
import { JPCBModel } from './../../../jPCB/models/jPCB.model';
import { TimeSlot } from './../../shared/models/timeSlot.model';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Utils } from "../../../../commons/app.utils";
import { JPCBService } from "../../../jPCB/services/jPCB.service";
import { TimeSlotSetupService } from "../../../timeSlotSetup/services/timeSlotSetup.service";
import { JPCBBayModel } from "../../../jPCB/models/jPCBBay.model";

declare var $: any;

@Component({
    selector: "jPCB-table-view",
    templateUrl: './viewJPCB.component.html',
    styleUrls: ['./viewJPCB.style.css']
})

export class JPCBViewComponent implements OnInit {
    currentDate: Date;
    workingTime: any;
    bays: any;
    jPCBBays: JPCBBayModel[] = [];
  
    constructor(private route: ActivatedRoute, private jPCBService: JPCBService,
        private router: Router, private slimLoadingBarService: SlimLoadingBarService,
        private Utils: Utils, private timeSlotservice: TimeSlotSetupService,
        private appConfig: AppConfig) { }

    ngOnInit(): void {
        this.currentDate = this.getCurrentDate();

        this.workingTime = ["7.00", "8.00", "9.00", "10.00", "11.00",
            "12.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00"]
        this.loadData();
    }

    loadData() {
        this.buildJPCBProgress();
        setInterval(() => {
            this.buildJPCBProgress();
        }, 10000);
    }

    buildJPCBProgress() {
        Observable.forkJoin([this.jPCBService.getAllByDate(this.currentDate.toString()),
        this.jPCBService.getAllWorkBay()])
            .subscribe(results => {
                var jPCBs = results[0] as JPCBModel[];
                this.bays = results[1].data.rows;
                this.bays.forEach(bay => {
                    var jPCBBay = new JPCBBayModel();
                    jPCBBay.bayId = bay.id;
                    jPCBBay.bayName = bay.code;
                    jPCBBay.jPCBs = jPCBs.filter(i => i.bayId == bay.id);
                    this.jPCBBays.push(jPCBBay);
                });
                setTimeout(() => {
                    this.drawJPCB();
                }, 500)
            })
    }

    drawJPCB() {
        var startTimeline = this.getStartTimeline();
        this.jPCBBays.forEach(jPCBBay => {
            jPCBBay.jPCBs.forEach(jPCB => {
                this.drawJPCBItem(startTimeline, jPCB);
            })
        })

        this.drawJPCBTimeline();
    }

     drawJPCBTimeline() {
        let currentTime: Date = new Date();
        let startTime: Date = this.getStartTimeline();
        let endTime: Date = this.getEndTimeline();

        var cols = $('#tableJPCB>thead>tr>td');
        var startColIndex = 2;
        var offsetLeft = $(cols[startColIndex]).position().left;
        var widthPerHour = $(cols[startColIndex]).outerWidth();
        var totalMiliSeconds = (currentTime.getTime() - startTime.getTime());
        var hours = (totalMiliSeconds / 3600000);
        var left = hours * widthPerHour + offsetLeft;
        let screenWidth = $("#divTableJPCB").width();
        if (left > 0 && left <= screenWidth) {
            $('.timeline').css('left', left + 'px');
            $('.timeline').removeClass('hide');
        }
        else {
            $('.timeline').addClass('hide');
        }
        var top = $('#tableJPCB').position().top;
        var height = $('#tableJPCB').height();
        $('.timeline').css('top', top + 'px');
        $('.timeline').css('height', height + 'px');
    }

    onWindowResize(event) {
        this.drawJPCB();
    }

    getStartTimeline() {
        var date = new Date();
        var startTimeline = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0);
        return startTimeline;
    }

    getEndTimeline() {
        var date = new Date();
        var startTimeline = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0);
        return startTimeline;
    }

    getCurrentDate() {
        var date = new Date();
        var currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return currentDate;
    }

    drawJPCBItem(timeLineStart: Date, jPCB: JPCBModel) {
        var cols = $('#tableJPCB>thead>tr>td');
        var startColIndex = 2;
        var offsetLeft = $(cols[startColIndex]).position().left;
        var widthPerHour = $(cols[startColIndex]).outerWidth();
        var totalMiliSeconds = (new Date(jPCB.startTime).getTime() - new Date(timeLineStart).getTime());
        var hours = (totalMiliSeconds / 3600000);
        var left = hours * widthPerHour + offsetLeft;

        var row = $('tr[data-bayid=' + jPCB.bayId + ']:first');
        if (row.length > 0 && left < $("#divTableJPCB").outerWidth()) {
            totalMiliSeconds = (new Date(jPCB.endTime).getTime() - new Date(jPCB.startTime).getTime());
            hours = (totalMiliSeconds / 3600000);
            var width = hours * widthPerHour;
            var height = row.height();
            var top = row.position().top;

            var backgroundColor = '#ffff99';
            if (jPCB.jPCBStatusId == JPCBStatusEnum.PLANNED) {
                backgroundColor = '#ffff99';
                if (jPCB.startTime < new Date()) { // Delayed
                    backgroundColor = '#fac090';
                }
            } else if (jPCB.jPCBStatusId == JPCBStatusEnum.INPROGRESS) {
                backgroundColor = '#c3d69b';
            } else if (jPCB.jPCBStatusId == JPCBStatusEnum.COMPLETED) {
                backgroundColor = '#eeece1';
            }

            var regNo = jPCB.registrationNo;
            var borderColor = '#ffff00';
            if(jPCB.isCustomerWaiting){
                borderColor = 'red';
            }
            var rectangle = '<div name="jpcb-' + jPCB.id + '" title="' + regNo + '" style="position: absolute; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; left:' + left + 'px; height:' + height + 'px; line-height:' + (height - 3) + 'px; top:' + top + 'px; width:' + width + 'px; background-color:' + backgroundColor + '; border-style: solid; border-width:thin; border-color:' + borderColor + '">' + regNo + '</div>';
            $('div[name=jpcb-' + jPCB.id + ']').remove();
            $('#tableJPCB').prepend(rectangle);
        } else {
            $('div[name=jpcb-' + jPCB.id + ']').remove();
        }
    }
}