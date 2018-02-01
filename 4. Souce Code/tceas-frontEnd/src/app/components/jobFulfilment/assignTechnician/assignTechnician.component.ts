import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { JobFulfilmentService } from "../services/jobFulfilment.service";
import { Utils } from "../../../commons/app.utils";
import { AppConfig } from "../../../config/app.config";
import { Constants } from "../../../config/app.constant";
import { AssignTechnicianSearchResultModel } from "../models/assignTechnicianSearch.model";
declare var $: any;

@Component({
    selector: 'assignTechnician-dialog',
    templateUrl: './assignTechnician.component.html',
    styleUrls: ['./assignTechnician.style.css']
})

export class AssignTechnicianComponent implements OnInit {

    @Output() assignTechnicianEvent = new EventEmitter();
    @Input() selectedJobFulfilmentItemId: number;

    assignTechnicianSearchResult: AssignTechnicianSearchResultModel = new AssignTechnicianSearchResultModel();

    constructor(private route: ActivatedRoute,
        private router: Router,
        private jobFulfilmentService: JobFulfilmentService,
        private utils: Utils,
        private appConfig: AppConfig,
        private constants: Constants) {
    }

    ngOnInit(): void {
        $('#assignTechnician-modal').on('shown.bs.modal', () => {
            this.jobFulfilmentService.getAssignTechnicians(0, Number.MAX_SAFE_INTEGER, null).then(result => {
                this.assignTechnicianSearchResult = result;
            })
        })
    }

    assignTechnicians(isApplyAll: boolean){
        var selectedAssignTechnicians = this.assignTechnicianSearchResult.rows.filter(r=>r.selected == true);
        var data = {
            isApplyAll,
            selectedAssignTechnicians,
            selectedJobFulfilmentItemId: this.selectedJobFulfilmentItemId
        };
        this.assignTechnicianEvent.emit(data);

        $('#assignTechnician-modal').modal('hide');
    }
}