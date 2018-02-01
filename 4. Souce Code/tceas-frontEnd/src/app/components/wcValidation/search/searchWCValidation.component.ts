import {Component, OnInit} from '@angular/core';
declare var $: any;
@Component({
    selector : "searchWCValidation-Search",
    templateUrl : './searchWCValidation.component.html',
    styleUrls:['./searchWCValidation.style.css']
})

export class SearchWCValidationComponent implements OnInit{
    constructor() { }

    ngOnInit(): void {
        $('.datatable-searchWCValidation table').dataTable({
            filter: false,
            orderCellsTop: true,
            scrollX: true,
            //autoWidth: true,
            scrollY: "320px",
            scrollCollapse: true,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".datatable-searchWCValidation .dataTables_length select").select2({
		    width: 80
	    });
        
    }
}