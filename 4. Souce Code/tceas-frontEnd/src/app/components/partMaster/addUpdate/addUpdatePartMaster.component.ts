import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartMasterService } from "../services/partMaster.service";
declare var $: any;

@Component({
    selector: "partMaster-addUpdate",
    templateUrl: './addUpdatePartMaster.component.html',
    styleUrls: ['./addUpdatepartMaster.style.css']
})

export class PartMasterAddUpdateComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router,
        private partMasterService: PartMasterService) { }

    id: number;
    private sub: any;
    part: any;
    isUpdate = false;

    ngOnInit(): void {
        this.part = {};
        $('.datatable-modelUsage table').dataTable({
            filter: false,
            orderCellsTop: true,
            scrollX: true,
            autoWidth: false,
            lengthMenu: [10, 25, 50, 75, 100, 200]
        });

        $(".datatable-modelUsage .dataTables_length select").select2({
            width: 80
        });

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        if (isNaN(this.id)) {
            this.isUpdate = true;
        } else {
            this.partMasterService
                .getById(this.id)
                .retry(3)
                .subscribe(result => {
                    this.part = result.data;
                });
        }


    }

    addUpdate(part) {
        if (!this.isUpdate) {
            console.log("update");
            //Update part master
            this.partMasterService
                .updatePartMaster(part)
                .retry(3)
                .subscribe(result => {
                    console.log(result);
                    this.onCompleted();
                });
        } else {
            console.log("add");
            //Add new part master
            this.partMasterService
                .addPartMaster(part)
                .retry(3)
                .subscribe(result => {
                    console.log(result);
                    this.onCompleted();
                });
        }

    }

    onCompleted() {
        this.router.navigate(['/partMaster/Search']);
    }
}