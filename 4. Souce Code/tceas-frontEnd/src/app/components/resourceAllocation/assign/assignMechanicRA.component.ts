import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'resouceAllocation-assign',
    templateUrl: './assignMechanicRA.component.html',
    styleUrls : ['../assignRA.style.css']
})

export class AssignMechanicRAComponent implements OnInit{
    
    ngOnInit(): void {
         $('.job-details-ra table').dataTable({
            searching: false,
            ordering : false,
            lengthChange: false,
            paging: false,
            info: false
        });

        $('.tags').tagsInput({
            defaultText:'',
            delimiter:'$###$',
            interactive:false
        });
    }

    assignMechanics() {
        $('#assign-mechanic-ra-modal').modal();
    }
}