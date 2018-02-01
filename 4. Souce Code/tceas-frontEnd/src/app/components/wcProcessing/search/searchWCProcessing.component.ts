import { TranslateService } from '@ngx-translate/core';
import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
    selector : "searchWCProcessing-Search",
    templateUrl : './searchWCProcessing.component.html',
    styleUrls:['./searchWCProcessing.style.css']
})

export class SearchWCProcessingComponent implements OnInit{
    constructor(
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        $('.datatable-searchWCProcessing table').dataTable({
            filter: false,
            orderCellsTop: true,
            scrollX: true,
            //autoWidth: true,
            scrollY: "320px",
            scrollCollapse: true,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".datatable-searchWCProcessing .dataTables_length select").select2({
		    width: 80
	    });
        
    }
}