import { Constants } from './../../../config/app.constant';
import { AppConfig } from './../../../config/app.config';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JobFulfilmentService } from "../services/jobFulfilment.service";
import { JobFulfilmentSearchResultModel } from "../models/jobFulfilmentSearch.model";
declare var $: any;

@Component({
    selector: 'jobFulfilment-search',
    templateUrl: './jobFulfilmentSearch.component.html',
})

export class JobFulfilmentSearchComponent implements OnInit {

    jobFulfilmentSearchResultModel: JobFulfilmentSearchResultModel = new JobFulfilmentSearchResultModel();

    constructor(private router: Router,
        private jobFulfilmentService: JobFulfilmentService,
        private appConfig: AppConfig,
        private constants: Constants) {
    }

    ngOnInit(): void {
        this.jobFulfilmentService
            .getAll(1, 10000, null).then((result) => {
                this.jobFulfilmentSearchResultModel = result;
                console.log(this.jobFulfilmentSearchResultModel);
           /*      setTimeout(function () {
                    $('.search-job-fulfilment table').dataTable({
                        filter: false,
                        orderCellsTop: true,
                        scrollX: true,
                        scrollY: "320px",
                        scrollCollapse: true,
                        lengthMenu: [10, 25, 50, 75, 100, 200]
                    });
                }, 100); */
            });
    }

}