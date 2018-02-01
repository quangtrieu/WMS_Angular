import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: "wcSubmission-Search",
    templateUrl: './searchWCSubmission.component.html',
    styleUrls: ['./searchWCSubmission.style.css']
})

export class SearchWCSubmissionComponent implements OnInit {
    constructor(
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        $('.datatable-searchWCSubmission table').dataTable({
            filter: false,
            orderCellsTop: true,
            scrollX: true,
            //autoWidth: true,
            scrollY: "320px",
            scrollCollapse: true,
            lengthMenu: [10, 25, 50, 75, 100, 200]
        });

        $(".datatable-searchWCSubmission .dataTables_length select").select2({
            width: 80
        });

    }
}