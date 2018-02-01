import { Component, OnInit } from '@angular/core';
import { DummyData } from "../../../../dummydata/dummydata";
declare var $: any;

@Component({
    selector : "ROv2-Search",
    templateUrl : './searchROv2.component.html',
    styleUrls:['./searchROv2.style.css']
})

export class ROv2SearchComponent implements OnInit{
    
    dummyData : DummyData;

    constructor() { }

    ngOnInit(): void {
        
        this.dummyData = new DummyData();
    }
     ngAfterViewInit(): void {
         $('.datatable-searchRO table').dataTable({
            filter: false,
            orderCellsTop: true,
            scrollX: true,
            //autoWidth: true,
            scrollY: "320px",
            scrollCollapse: true,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".datatable-searchRO .dataTables_length select").select2({
		    width: 80
	    });
    }

}