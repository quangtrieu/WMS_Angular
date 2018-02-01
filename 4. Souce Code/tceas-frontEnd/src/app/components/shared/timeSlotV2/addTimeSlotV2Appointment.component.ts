import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TimeSlot } from "../models/timeSlot.model";
import { TimeSlotSetupService } from "../../timeSlotSetup/services/timeSlotSetup.service";
import { Observable } from "rxjs/Rx";
declare var $: any;

@Component({
    selector: 'appointment-addTimeSlotV2',
    templateUrl: './addTimeSlotV2Appointment.component.html',
    styleUrls: ['./addTimeSlotV2Appointment.style.css']
})

export class AddTimeSlotV2AppointmentComponent implements OnInit {
    @Output() timeSlotUpdatedEvent = new EventEmitter();
    @Input() selectedTimeSlotDetail: any = {};
    timeSlots: any = [];
    timeSlotDetails: any = [];
    timeSlotDetailsInCols: any = [];
    timeSlotSepcialDays: any = [];
    countTimeSlotDetailUses: any = [];
    workShops: any = [];
    calendar: any;

    constructor(private router: Router,
        private timeSlotSetupService: TimeSlotSetupService) { }

    ngOnInit(): void {
        this.calendar = $('.fullcalendar').fullCalendar({
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: ''
            },
            selectable: true,
            selectHelper: true,
            select: (start, end, allDay) => {
                var startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate() - 1);
                var selectedTimeSlot = $.extend(true, {}, this.getTimeSlotBySelectedDate(startDate)); // Clone object
                if (selectedTimeSlot != null) {
                    $('.datatable-addTimeSlotV2Appoinmet').removeClass('hide');
                }
                else {
                    $('.datatable-addTimeSlotV2Appoinmet').addClass('hide');
                    selectedTimeSlot = {};
                }
                if (selectedTimeSlot.TimeSlotDetails) {
                    selectedTimeSlot.TimeSlotDetails.forEach(el => {
                        var numberOfSlotsUsed = this.getCountTimeSlotDetailUses(startDate, el.id);
                        el.numberOfSlots = el.numberOfSlots - numberOfSlotsUsed;
                    });
                }
                this.timeSlotDetailsInCols = this.buildTimeSlotDetailsInCols(selectedTimeSlot.TimeSlotDetails);
                this.timeSlotDetails = selectedTimeSlot.TimeSlotDetails;
                this.selectedTimeSlotDetail.timeSlotDate = startDate;
            },
            eventClick: (calEvent, jsEvent, view) => {
                this.calendar.fullCalendar('select', calEvent.start);
            },
            viewRender: (view, element) => {
                this.calendar.fullCalendar('removeEvents');
                $('.datatable-addTimeSlotV2Appoinmet').addClass('hide');

                var startDate = this.calendar.fullCalendar('getView').visStart;
                var endDate = this.calendar.fullCalendar('getView').visEnd;

                Observable.forkJoin([this.timeSlotSetupService.getTimeSlotSpecialDaysByDateRange(startDate, endDate),
                this.timeSlotSetupService.getTimeSlots(this.selectedTimeSlotDetail.workShopId),
                this.timeSlotSetupService.getTimeSlotDetailUses(this.selectedTimeSlotDetail.workShopId, startDate, endDate)]).subscribe(results => {
                    var timeSlotSpecfialDayResult = results[0];
                    var timeSlotResult = results[1];
                    var timeSlotDetailUsesResult = results[2];
                    if (timeSlotSpecfialDayResult.success && timeSlotResult.success && timeSlotDetailUsesResult.success) {
                        this.timeSlots = timeSlotResult.data;
                        this.timeSlotSepcialDays = timeSlotSpecfialDayResult.data;
                        this.countTimeSlotDetailUses = timeSlotDetailUsesResult.data;
                        var events = [];
                        while (startDate <= endDate) {
                            var slots = 0;
                            var isOffDay = this.isOffDay(startDate);
                            if (!isOffDay) {
                                var timeSlot = this.getTimeSlotBySelectedDate(startDate);
                                if (timeSlot && timeSlot.TimeSlotDetails) {
                                    timeSlot.TimeSlotDetails.forEach(el => {
                                        var numberOfSlotsUsed = this.getCountTimeSlotDetailUses(startDate, el.id);
                                        slots = slots + el.numberOfSlots - numberOfSlotsUsed;
                                    });
                                }
                            }
                            events[events.length] = {
                                title: 'Slots: ' + slots,
                                start: startDate
                            }

                            startDate = new Date(startDate.setDate(startDate.getDate() + 1));
                        }
                        this.calendar.fullCalendar('addEventSource', events);

                        if (this.selectedTimeSlotDetail.timeSlotDate) {
                            var startTime = new Date(this.selectedTimeSlotDetail.timeSlotDate);
                            if (startTime >= this.calendar.fullCalendar('getView').visStart && startTime <= this.calendar.fullCalendar('getView').visEnd) {
                                startTime = new Date(startTime.setDate(startTime.getDate() + 1)) // add 1 day
                                this.calendar.fullCalendar('select', startTime);
                            }
                        }
                    }
                });
            },
            editable: true,
            unselectAuto: false
        });

        $('#addTimeSlotV2Appointment-modal').on('shown.bs.modal', async () => {
            this.workShops = await this.timeSlotSetupService.getWorkShops();
            if(!this.selectedTimeSlotDetail.timeSlotDate)
                this.selectedTimeSlotDetail.timeSlotDate = Date();
            if (this.selectedTimeSlotDetail.id > 0) {
                var selectedDate = new Date(this.selectedTimeSlotDetail.timeSlotDate);
                this.calendar.fullCalendar('gotoDate', selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDay());
                if (this.calendar.fullCalendar('clientEvents').length > 0)
                    this.calendar.fullCalendar('render');
            }
            else {
                this.selectedTimeSlotDetail = {};
                this.calendar.fullCalendar('render');
            }
        })
    }

    changeWorkShop() {
        var selectedDate = new Date(this.selectedTimeSlotDetail.timeSlotDate);
        this.calendar.fullCalendar('gotoDate', selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDay());
        if (this.calendar.fullCalendar('clientEvents').length > 0)
            this.calendar.fullCalendar('render');
    }

    confirmAppointment() {
        if (this.timeSlotDetails && this.selectedTimeSlotDetail.id) {
            var timeSlotDetail = this.timeSlotDetails.filter(t => t.id == this.selectedTimeSlotDetail.id);
            var data = {
                id: this.selectedTimeSlotDetail.id,
                timeSlotDate: this.selectedTimeSlotDetail.timeSlotDate,
                timeSlotTime: timeSlotDetail[0].startTime,
                workShopId: this.selectedTimeSlotDetail.workShopId
            }
            this.timeSlotUpdatedEvent.emit(data);
        }
    }

    getTimeSlotBySelectedDate(selectedDate: any) {
        var day = selectedDate.getDay();
        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        var timeSlot = this.timeSlots.filter(a => a.name == weekday[day]);
        if (timeSlot.length > 0) {
            return timeSlot[0];
        }

        return null;
    }

    isOffDay(selectedDate: any) {
        if (this.timeSlotSepcialDays == null || this.timeSlotSepcialDays.length == 0) return false;

        var sepcialDays = this.timeSlotSepcialDays.filter(a => a.pdTimeSlotSpecialDayTypeId == 2 && new Date(a.specialDay).toDateString() == selectedDate.toDateString());
        return sepcialDays.length > 0;
    }

    getCountTimeSlotDetailUses(selectedDate: any, timeSlotDetailId: any) {
        if (this.countTimeSlotDetailUses == null || this.countTimeSlotDetailUses.length == 0) return 0;

        var uses = this.countTimeSlotDetailUses.filter(a => a.timeSlotDetailId == timeSlotDetailId && new Date(a.timeSlotDate).toDateString() == selectedDate.toDateString());
        var count = 0;
        uses.forEach(el => {
            count = count + el.countTimeDetailUse;
        });
        return count;
    }

    /*
    Build 2 collumns per row
    */
    buildTimeSlotDetailsInCols(timeSlotDetails: any) {
        if (timeSlotDetails == null || timeSlotDetails.length == 0) return [];

        var numberRows = parseInt((timeSlotDetails.length / 2).toString(), 10)
            + (timeSlotDetails.length % 2 != 0 ? 1 : 0);
        var result = [];
        for (var n = 0; n < numberRows; n++) {
            var timeSlotDetail: any = {};
            timeSlotDetail.id = timeSlotDetails[n].id;
            timeSlotDetail.startTime = timeSlotDetails[n].startTime;
            timeSlotDetail.numberOfSlots = timeSlotDetails[n].numberOfSlots;
            var index = numberRows + n;
            if (index < timeSlotDetails.length) {
                timeSlotDetail.id2 = timeSlotDetails[index].id;
                timeSlotDetail.startTime2 = timeSlotDetails[index].startTime;
                timeSlotDetail.numberOfSlots2 = timeSlotDetails[index].numberOfSlots;
            }
            result.push(timeSlotDetail);
        }

        return result;
    }
}
