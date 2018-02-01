import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicalReport } from "../../shared/models/technicalReport.model";

declare var $: any;

@Component({
    selector: "TrSubmission-addUpdate",
    templateUrl: './addUpdateSubmission.technicalReport.component.html',
    styleUrls: ['./addUpdateSubmission.technicalReport.style.css']
})

export class TechnicalReportSubmissionAddUpdateComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }


    constructor(
        private route: ActivatedRoute,
        private translate: TranslateService
    ) { }

    id: number;
    private sub: any;

    @Input() technicalReport: TechnicalReport;
    ngOnInit(): void {
        $('.datatable-addUpdateSubmission table').dataTable({
            filter: false,
            // orderCellsTop:true,
            // scrollX: true,
            // autoWidth: false,
            lengthMenu: [5, 10, 15, 20, 50, 100]
        });

        $(".datatable-addUpdateSubmission .dataTables_length select").select2({
            width: 80
        });

        $('.datatable-addUpdateSubmission-part table').dataTable({
            filter: false,
            // orderCellsTop:true,
            // scrollX: true,
            // autoWidth: false,
            lengthMenu: [5, 10, 15, 20, 50, 100]
        });

        $(".datatable-addUpdateSubmission-part .dataTables_length select").select2({
            width: 80
        });

        $('.datatable-addUpdateSubmission-attachment table').dataTable({
            filter: false,
            // orderCellsTop:true,
            // scrollX: true,
            // autoWidth: false,
            lengthMenu: [5, 10, 15, 20, 50, 100]
        });

        $(".datatable-addUpdateSubmission-attachment .dataTables_length select").select2({
            width: 80
        });

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.technicalReport = new TechnicalReport();
        if (this.id == 1) {
            this.technicalReport.isUpdate = true;
        }
    }

}