import { TimeSlotSetupService } from './../../timeSlotSetup/services/timeSlotSetup.service';
import { Utils } from './../../../commons/app.utils';
import { AppointmentService } from './../../appointment/services/appointment.service';
import { Component, OnInit, Input } from '@angular/core';
import { TimeSlot } from "../models/timeSlot.model";
import { Router } from '@angular/router';
import * as moment from 'moment';

declare var $: any;


@Component({
    selector: 'appointment-board',
    templateUrl: './boardAppointment.component.html',
    styleUrls: ['./boardAppointment.style.css']
})

export class BoardAppointmentComponent implements OnInit {

    timeSlot: any;
    appointmentBoard: any;
    constructor(private Utils: Utils,
                private appointmentService: AppointmentService, 
                private timeSlotservice: TimeSlotSetupService) { }

    ngOnInit(): void {
        this.timeSlot = [];
        this.appointmentBoard = [];
        $('#appointmentBoard-modal').on('shown.bs.modal', () => {
            this.onLoadTimeSlot();
        });
    }

    onLoadTimeSlot() {
        // Promise.all([
        //     this.timeSlotservice.getTimeSlot(),
        //     this.appointmentService.getAllServiceAdvisor(1, 1000, null),
        //   ]).then(value => {
        //       let abc = value;
        //   });
        this.timeSlotservice
            .getTimeSlotByDate(moment().format('ddd Y-MM-DD'))
            .retry(3)
            .subscribe(resultTimeSlot => {
                console.log(resultTimeSlot);
                this.appointmentService
                    .getAllServiceAdvisor(1, 1000, null)
                    .then(resultSA => {
                        // console.log(resultSA);
                        // Todo: Get GetAppointmentBy curent Date
                        var resultAppointment: any = {};
                        this.bindAppointmentBoardData(resultSA, resultTimeSlot, resultAppointment);
                    });
            });
        // console.log(this.Utils.getTimeFromDateTime("2017-07-01T06:30:00.000"));
        // console.log(moment().format('ddd Y-MM-DD'));
        // this.appointmentService
        //     .getAppointmentBoard()
        //     .retry(3)
        //     .subscribe(result => {
        //         this.appointmentBoard = result.data;
        //         if (this.appointmentBoard && this.appointmentBoard.length > 0) {
        //             this.timeSlot = this.appointmentBoard[0].timeSlot;
        //             this.timeSlot.forEach(elementTimeSlot => {
        //                 elementTimeSlot.startTime = this.Utils.getTimeFromDateTime(elementTimeSlot.startTime.replace("Z", ""));
        //                 elementTimeSlot.endTime = this.Utils.getTimeFromDateTime(elementTimeSlot.endTime.replace("Z", ""));
        //             });
        //         }

        //         console.log(this.appointmentBoard);
        //     });
    }

    bindAppointmentBoardData(serviceAdvisor, timeSlot, appointment) {
        // get data each type
        let arrSA = serviceAdvisor.data.rows;
        let arrTS = timeSlot.data;
        let arrAppointment = appointment.data;
        
        this.appointmentBoard = [];

        arrSA.forEach(element => {
            let serviceAdvisor = element;
            serviceAdvisor.timeSlot = [];

            if (arrTS) {
                let isBreakTime = false;
                arrTS.TimeSlotDetails.forEach(elementTimeSlot => {
                    let timeSlot: any = {};
                    timeSlot.appointmentNo = "";
                    timeSlot.registrationNo = "";
                    
                    if (isBreakTime) {
                        let timeSlot1: any = {};
                        timeSlot1.appointmentNo = "";
                        timeSlot1.registrationNo = "";

                        timeSlot1.startTime = arrTS.breakStartTime;
                        timeSlot1.endTime = arrTS.breakEndTime;
                        timeSlot1.isBreakTime = true;
                        isBreakTime = false; 
                        serviceAdvisor.timeSlot.push(timeSlot1);
                    }

                    timeSlot.startTime = elementTimeSlot.startTime;
                    timeSlot.endTime = elementTimeSlot.endTime;
                    timeSlot.isBreakTime = false;
                    arrAppointment.forEach(elementAppointment => {
                        if (elementAppointment.serviceAdvisorId == element.id && 
                            elementAppointment.timeSlotDetail &&
                            elementAppointment.timeSlotDetail.timeSlotDetailId == elementTimeSlot.id) {
                            timeSlot.appointmentNo = elementAppointment.appointmentNo;
                            timeSlot.registrationNo = elementAppointment.vehicle.registrationNo;
                        }
                    });

                    if(this.checkBreakTime(elementTimeSlot.startTime, elementTimeSlot.endTime, 
                        arrTS.breakStartTime, arrTS.breakEndTime)) {                        
                        isBreakTime = true;                    
                    } else {
                        isBreakTime = false;  
                    }

                    serviceAdvisor.timeSlot.push(timeSlot);
                });
            };

            this.appointmentBoard.push(serviceAdvisor);
        });
        this.timeSlot = this.appointmentBoard[0].timeSlot;
    }

    checkBreakTime(startWorkingTime, endWorkingTime, startBreakTime, endBreakTime) {
        let startWorking = parseInt(startWorkingTime.replace(":", ""));
        let endWorking = parseInt(endWorkingTime.replace(":", ""));
        let startBreak = parseInt(startBreakTime.replace(":", ""));
        let endBreak = parseInt(endBreakTime.replace(":", ""));
        
        if(endWorking == startBreak) {
            console.log(endWorking);
            return true;
        } else {
            return false;
        }
        
    }
}
