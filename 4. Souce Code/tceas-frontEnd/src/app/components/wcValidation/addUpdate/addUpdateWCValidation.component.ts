import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WCValidation } from "../models/wCValidation.model";
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
    selector: "wcvalidation-addUpdate",
    templateUrl: './addUpdateWCValidation.component.html',
    styleUrls: ['./addUpdateWCValidation.style.css']
})

export class WCValidationAddUpdateComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    id: number;
    private sub: any;

    @Input() wCValidation: WCValidation;
    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        $('.datatable-addUpdateWCValidation table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".datatable-addUpdateWCValidation .dataTables_length select").select2({
		    width: 80
	    });

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.wCValidation = new WCValidation();
        if (this.id != 1) {
            this.wCValidation.isUpdate = true;
            this.wCValidation.validationMatrixcode = "MA0001";
            this.wCValidation.revision = "1";
            this.wCValidation.description = "JG001";
            this.wCValidation.active = true;
        }
    }
    addUpdate(wCValidation: WCValidation) {

    }

}