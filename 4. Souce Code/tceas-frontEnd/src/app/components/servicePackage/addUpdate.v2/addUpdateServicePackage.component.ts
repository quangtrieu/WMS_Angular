import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
    selector: "servicepackage-addUpdate",
    templateUrl: './addUpdateServicePackage.component.html',
    styleUrls: ['./addUpdateServicePackage.style.css']
})

export class ServicePackageAddUpdateComponentV2 implements OnInit {
    constructor() { }

    ngOnInit(): void {
        // $('.datatable-addUpdateVehicleProfile table').dataTable({
        //     filter: false,
        //     orderCellsTop: true,
        //     scrollX: true,
        //     autoWidth: false,
        //     lengthMenu: [10, 25, 50, 75, 100, 200]
        // });

        // $(".datatable-addUpdateVehicleProfile .dataTables_length select").select2({
        //     width: 80
        // });

    }
   
}