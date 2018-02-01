import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: "wcProcessing-addUpdate",
    templateUrl: './addUpdateWCProcessing.component.html',
    styleUrls:['./addUpdateWCProcessing.style.css']
})

export class WCProcessingAddUpdateComponent implements OnInit {

    constructor(
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        $('.datatable-addUpdateWCProcessing table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".datatable-addUpdateWCProcessing .dataTables_length select").select2({
		    width: 80
	    });

    }

}