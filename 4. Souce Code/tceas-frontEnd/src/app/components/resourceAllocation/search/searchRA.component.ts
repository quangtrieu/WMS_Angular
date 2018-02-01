import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'resouceAllocation-search',
    templateUrl: './searchRA.component.html',
})

export class SearchRAComponent implements OnInit{
    
    ngOnInit(): void {
         $('.search-resouce-allocation table').dataTable({
            filter: false,
            orderCellsTop: true,
            scrollX: true,
            //autoWidth: true,
            scrollY: "320px",
            scrollCollapse: true,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".search-resouce-allocation .dataTables_length select").select2({
		    width: 80
	    });
    }

}