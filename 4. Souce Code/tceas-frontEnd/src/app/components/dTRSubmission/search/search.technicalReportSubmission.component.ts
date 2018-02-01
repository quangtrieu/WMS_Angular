import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { TechnicalReportService } from '../services/technicalReport.service';
import { SelectModule } from 'ng2-select';
import { Select2OptionData } from 'ng2-select2';
import { TechnicalReport } from "../models/technicalReport.model";
import { SearchViewModel } from "../../shared/models/searchView.model";

declare var $: any;

@Component({
    selector: "trSubmission-Search",
    templateUrl: './search.technicalReportSubmission.component.html',
    styleUrls: ['./search.technicalReportSubmission.style.css']
})

export class TechnicalReportSubmissionSearchComponent implements OnInit {

    constructor(
        private translate: TranslateService
    ) {

    }
    ngOnInit(): void {
        $('.datatable-searchSubmission table').dataTable({
            filter: false,
            orderCellsTop: true,
            scrollX: true,
            //autoWidth: true,
            scrollY: "320px",
            scrollCollapse: true,
            lengthMenu: [10, 25, 50, 75, 100, 200]
        });

        $(".datatable-searchSubmission .dataTables_length select").select2({
            width: 80
        });

    }

}