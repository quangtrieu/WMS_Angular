import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: "wcSubmission-addUpdate",
    templateUrl: './addUpdateWCSubmission.component.html',
    styleUrls: ['./addUpdateWCSubmission.style.css']
})

export class WCSubmissionAddUpdateComponent implements OnInit {

    constructor(
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        $('.datatable-addUpdateWCSubmission table').dataTable({
            filter: false,
            lengthMenu: [10, 25, 50, 75, 100, 200]
        });

        $(".datatable-addUpdateWCSubmission .dataTables_length select").select2({
            width: 80
        });

    }

}