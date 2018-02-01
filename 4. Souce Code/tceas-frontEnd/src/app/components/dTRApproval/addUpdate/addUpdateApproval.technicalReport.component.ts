import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicalReport } from "../../shared/models/technicalReport.model";

declare var $: any;
@Component({
    selector: "TrApproval-addUpdate",
    templateUrl: './addUpdateApproval.technicalReport.component.html',
    styleUrls: ['./addUpdateApproval.technicalReport.style.css']
})

export class TechnicalReportApprovalAddUpdateComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private translate: TranslateService) { }

    id: number;
    private sub: any;

    @Input() technicalReport: TechnicalReport;
    ngOnInit(): void {
        $('.datatable-addUpdateApproval table').dataTable({
            filter: false,
            lengthMenu: [10, 25, 50, 75, 100, 200]
        });

        $(".datatable-addUpdateApproval .dataTables_length select").select2({
            width: 80
        });

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.technicalReport = new TechnicalReport();
        if (this.id != 0) {
            this.technicalReport.isUpdate = true;
        }
    }

}