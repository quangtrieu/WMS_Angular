import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TimeSlot } from "../models/timeSlot.model";
declare var $: any;

@Component({
    selector: 'appointment-addTimeSlot',
    templateUrl: './addTimeSlotAppointment.component.html',
    styleUrls: ['./addTimeSlotAppointment.style.css']
})

export class AddTimeSlotAppointmentComponent implements OnInit{
    
    @Input() timeSlot: TimeSlot;
    
    constructor(public router: Router) { }

    ngOnInit(): void {
       $('.datatable-addDateSlotAppoinmet table').dataTable({
            searching: false,
            ordering : false,
            lengthChange: false,
            paging: false,
            info: false
        });

        $('#selected-date-slot').val('2017-07-03');
    }

    confirmAppointment(){
        if(this.timeSlot!=null && this.timeSlot.from == 1){ // From Dashboard
            var _router = this.router;
            var selectedDate = new Date($('#selected-date-slot').val());
            var today = new Date();
            if(selectedDate.getDate() == today.getDate() 
              && selectedDate.getMonth() == today.getMonth()
              && selectedDate.getFullYear() == today.getFullYear()){
                  setTimeout(function () { 
                    _router.navigate(['/repairOrder/Add']);
                 }, 1000);
              }
              else{
                  setTimeout(function () { 
                    _router.navigate(['/appointment/Add']);
                 }, 1000);
              }
        }
    }
}
