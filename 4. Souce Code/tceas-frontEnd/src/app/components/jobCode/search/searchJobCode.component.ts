import { Component, OnInit, ViewChild } from '@angular/core';
import { JobCodeService } from "../services/jobCode.service";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable } from "rxjs/Rx";
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng';
import { Constants } from '../../../config/app.constant';
import { SortColumn } from '../../shared/models/sortColumn.model';
import { Utils } from '../../../commons/app.utils';
declare var $: any;

@Component({
    selector: "jobCode-Search",
    templateUrl: './searchJobCode.component.html',
    styleUrls: ['./searchJobCode.style.css']
})

export class JobCodeSearchComponent implements OnInit {
    statusObjects: Array<any>;
    jobDataTable: any;
    sortedColumn: SortColumn;
    jobList: any;
    job: any;
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalRecords: 0,
    };

    @ViewChild('confirmDeleteModal')
    confirmDeleteModal: ModalComponent;

    jobCodes: any = [];

    constructor(private router: Router,
        private constant: Constants,
        private appUtils: Utils,
        private jobCodeService: JobCodeService) {
    }

    ngOnInit(): void {
        this.jobList = {};
        this.sortedColumn = new SortColumn(null, true);
        this.statusObjects = this.appUtils.loadDropdowlistStatus();
    }

    loadJobListLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;
            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);
            this.loadJobList(currentPage, pageSize);
        }, 250);
    }

    loadJobList(curentPage: number, pageSize: number) {
        this.jobCodeService
            .getAll(curentPage, pageSize, this.jobList, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.jobDataTable = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
    }

    convertSortFilterModel(event) {
        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.jobList.code = filters.code ? filters.code.value : null;
                this.jobList.description = filters.description ? filters.description.value : null;
                this.jobList.status = filters.status ? filters.status.value : null;
                this.jobList.JobGroup = filters.JobGroup ? filters.JobGroup.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    confirmDeleteJobCodes(): void {

        if ($('input[name="ckbJobCode"]:checked').length > 0)
            this.confirmDeleteModal.open();
    }

    deleteJobCodes(): void {
        var items = $('input[name="ckbJobCode"]:checked');
        var subItems = [];
        for (var i = 0; i < items.length; i++) {
            var subItem = this.jobCodeService.delete($(items[i]).val());
            subItems.push(subItem);
        }
        Observable.forkJoin(subItems).subscribe(result => {
            location.reload();
        })

        this.confirmDeleteModal.close();
    }
}