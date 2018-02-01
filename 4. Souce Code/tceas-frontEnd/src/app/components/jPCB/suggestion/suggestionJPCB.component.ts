import { JPCBModel } from './../models/jPCB.model';
import { RepairOrderService } from './../../repairOrder/services/repairOrder.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { JPCBService } from './../services/jPCB.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from "rxjs/Observable";
import { TimeSlotSetupService } from "../../timeSlotSetup/services/timeSlotSetup.service";
import { JobCodeService } from "../../jobCode/services/jobCode.service";
import { Utils } from "../../../commons/app.utils";
declare var $: any;

@Component({
    selector: "jPCB-suggestion",
    templateUrl: './suggestionJPCB.component.html',
    styleUrls: ['./suggestionJPCB.style.css']
})

export class JPCBSuggestionComponent implements OnInit {
    @Input()
    repairOrderBay: any = {}
    bays: any = []

    constructor(private route: ActivatedRoute,
        private jPCBService: JPCBService,
        private router: Router,
        private slimLoadingBarService: SlimLoadingBarService,
        private timeSlotSetupService: TimeSlotSetupService,
        private jobCodeService: JobCodeService,
        private repairOrderService : RepairOrderService,
        private utils: Utils) { }

    ngOnInit(): void {
        if (this.repairOrderBay == null)
            this.repairOrderBay = {};

        $('#suggestion-jpcb-modal').on('shown.bs.modal', () => {
            this.suggestBay();
        });
    }

    suggestBay() {
        var currentDate = this.getCurrentDate();
        var dayName = this.utils.getDayName(currentDate);
        Observable.forkJoin([this.jPCBService.getAllWorkBay(),
        this.jPCBService.getAllByDate(currentDate.toString()),
        this.timeSlotSetupService.getTimeSlotByDate(dayName),
        this.repairOrderService.getJobsByRepairOrderId(this.repairOrderBay.repairOrderId)])
            .subscribe(results => {
                if (!results[0].success || !results[2].success || !results[3].success) return;
                this.bays = results[0].data.rows;
                var jPCBs = results[1] as JPCBModel [];
                var timeSlot = results[2].data;
                var repairOrderJob = results[3].data ? results[3].data[0] : null;
                if(!repairOrderJob) return;

                var job = repairOrderJob.JobMaster; // Suggest for frist job only
                if(!job) return;

                var estimatedHours = 0.5; // For testing

                var suggestBays = this.bays.filter(b => b.pdJobTypeId == job.pdJobTypeId);
                var baySlots = [];
                suggestBays.forEach(suggestBay => {
                    var roBays = jPCBs.filter(b => b.bayId == suggestBay.id);
                    var baySlot = { bayId: suggestBay.id, ranges: [], expectedTimeTotal: 0 };
                    var expectedTimeTotal = 0;
                    roBays.forEach(roBay => {
                        var expectedStartDate = this.utils.convertDateLocalToUTC(new Date(roBay.startTime));
                        var expectedEndDate = this.utils.convertDateLocalToUTC(new Date(roBay.endTime));
                        expectedTimeTotal = expectedTimeTotal + (expectedEndDate.getTime() - expectedStartDate.getTime());
                        baySlot.ranges.push({
                            expectedStartDate: expectedStartDate,
                            expectedEndDate: expectedEndDate
                        });
                    })
                    baySlot.expectedTimeTotal = expectedTimeTotal;
                    baySlots.push(baySlot);
                });

                // Sort ascending by Expected Time Total. Make sure bay with less than Expected Time Total will be choiced
                baySlots.sort((a, b) => {
                    return a.expectedTimeTotal - b.expectedTimeTotal
                });

                // Suggest bay and time slot
                var expectedStartDate = this.utils.convertDateLocalToUTC(new Date());
                var expectedEndDate = new Date(expectedStartDate.getTime() + estimatedHours * 60 * 60 * 1000);
                var expectedBayId = 0;
                for (var i = 0; i < baySlots.length; i++) {
                    var slot = baySlots[i];
                    var ranges = slot.ranges;
                    expectedBayId = slot.bayId;
                    var isSelect = ranges.length == 0;
                    for (var k = 0; k < ranges.length; k++) {
                        var range1 = ranges[k];
                        if (k == ranges.length - 1) {
                            if (range1.expectedEndDate < expectedEndDate) {
                                expectedStartDate = range1.expectedEndDate;
                                expectedEndDate = new Date(expectedStartDate.getTime() + estimatedHours * 60 * 60 * 1000);
                                isSelect = true;
                            }
                            break;
                        }
                        var range2 = ranges[k + 1];
                        if (range1.expectedEndDate > expectedStartDate && range2.expectedStartDate < expectedEndDate) {
                            expectedStartDate = range1.expectedEndDate;
                            expectedEndDate = new Date(expectedStartDate.getTime() + estimatedHours * 60 * 60 * 1000);
                            isSelect = true;
                            break;
                        }
                    }

                    if (isSelect) break;
                }
                
                this.repairOrderBay.repairOrderJobId = repairOrderJob.id;
                this.repairOrderBay.bayId = expectedBayId;
                this.repairOrderBay.expectedStartDate = moment(this.utils.convertDateUTCToLocal(expectedStartDate)).format('YYYY-MM-DDTHH:mm');
                this.repairOrderBay.expectedEndDate = moment(this.utils.convertDateUTCToLocal(expectedEndDate)).format('YYYY-MM-DDTHH:mm');
            });
    }

    confirmBay() {
        this.jPCBService.createSuggestedBay(this.repairOrderBay).subscribe(result => {
            $('#suggestion-jpcb-modal').modal('hide');
            this.router.navigate(['/jobFulfilment/Search']);
        })
    }

     getCurrentDate() {
        var date = new Date();
        var currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return currentDate;
    }
}