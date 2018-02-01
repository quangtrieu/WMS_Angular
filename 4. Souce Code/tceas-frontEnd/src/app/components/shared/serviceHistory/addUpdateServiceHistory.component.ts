import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
    selector: "serviceHistory-addUpdate",
    templateUrl: './addUpdateServiceHistory.component.html',
    styleUrls:['./addUpdateServiceHistory.style.css']
})

export class ServiceHistoryAddUpdateComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
        $('.datatable-service table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	// $(".datatable-service .dataTables_length select").select2({
		//     width: 80
	    // });
    }

}