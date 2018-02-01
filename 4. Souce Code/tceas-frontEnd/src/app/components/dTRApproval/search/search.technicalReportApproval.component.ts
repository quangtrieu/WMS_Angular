import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { TechnicalReportService } from '../services/technicalReport.service';
import { SelectModule } from 'ng2-select';
import { Select2OptionData } from 'ng2-select2';
import { TechnicalReport } from "../models/technicalReport.model";
import { SearchViewModel } from "../../shared/models/searchView.model";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

declare var $: any;

@Component({
    selector: "trApproval-Search",
    templateUrl: './search.technicalReportApproval.component.html',
    styleUrls: ['./search.technicalReportApproval.style.css']
})

export class TechnicalReportApprovalSearchComponent implements OnInit {
    constructor(
        private translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        $('.datatable-searchApproval table').dataTable({
            filter: false,
            orderCellsTop: true,
            scrollX: true,
            //autoWidth: true,
            scrollY: "320px",
            scrollCollapse: true,
            lengthMenu: [10, 25, 50, 75, 100, 200]
        });

        $(".datatable-searchApproval .dataTables_length select").select2({
            width: 80
        });
    }

}