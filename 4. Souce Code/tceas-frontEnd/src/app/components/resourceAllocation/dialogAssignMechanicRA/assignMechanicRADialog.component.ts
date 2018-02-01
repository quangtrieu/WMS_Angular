import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'resouceAllocation-assign-dialog',
    templateUrl: './assignMechanicRADialog.component.html',
    styleUrls : ['../assignRA.style.css']
})

export class AssignMechanicRADialogComponent implements OnInit{
    
    ngOnInit(): void {
         $('.datatable-assign-mechanic-ra table').dataTable({
           searching: false,
            ordering : false,
            lengthChange: false,
            paging: false,
            info: false
        });
    }

    showTaskDetails(){
        $('#task-details-ra-modal').modal();
    }
}