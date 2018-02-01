import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'resouceAllocation-task-detail-dialog',
    templateUrl: './taskDetailRADialog.component.html',
    styleUrls : ['../assignRA.style.css']
})

export class TaskDetailRADialogComponent implements OnInit{
    
    ngOnInit(): void {
         $('.datatable-task-details-ra table').dataTable({
            searching: false,
            ordering : false,
            lengthChange: false,
            paging: false,
            info: false
        });
    }
}