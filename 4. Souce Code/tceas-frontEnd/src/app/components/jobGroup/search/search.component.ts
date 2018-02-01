import { Component, OnInit, ViewChild } from '@angular/core';
import { JobGroup } from '../models/jobGroup.model';
import { Import } from "../../shared/models/import.model";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable } from "rxjs/Rx";
import { Router } from '@angular/router';
import { JobGroupService } from "../services/jobGroup.service";
declare var $: any;

@Component({
    selector: "jobGroup-Search",
    templateUrl: './search.component.html',
    styleUrls: ['./search.style.css']
})

export class JobGroupSearchComponent implements OnInit {
    jobGroups: any
    selectedJobGroup: any;
    import: Import
    @ViewChild('confirmDeleteModal')
    confirmDeleteModal: ModalComponent;

    constructor(private router: Router,
        private jobGroupService: JobGroupService) { }

    ngOnInit(): void {
        this.jobGroupService
            .getAll(1, 10000, null).subscribe((result) => {
                this.jobGroups = result.data.rows;
                setTimeout(function () {
                    $('.datatable-searchJobGroup table').dataTable({
                        filter: false,
                        scrollX: true,
                        scrollY: "320px",
                        scrollCollapse: true,
                        lengthMenu: [10, 25, 50, 75, 100, 200]
                    });
                }, 100);
            });
    }

    addUpdateJobGroup(id: number): void {
        if(id == 0){
             this.selectedJobGroup = {};
             $('#add-update-job-group-modal').modal();
             return;
        }
        this.jobGroupService.getById(id).subscribe(result => {
            if (result.success == 1) {
                this.selectedJobGroup = result.data;
                $('#add-update-job-group-modal').modal();
                console.log( this.selectedJobGroup);
            }
        })
    }

    confirmDeleteJobGroups(): void {

        if ($('input[name="ckbJobGroup"]:checked').length > 0)
            this.confirmDeleteModal.open();
    }

    deleteJobGroups(): void {
        var items = $('input[name="ckbJobGroup"]:checked');
        var subItems = [];
        for (var i = 0; i < items.length; i++) {
            var subItem = this.jobGroupService.delete($(items[i]).val());
            subItems.push(subItem);
        }
        Observable.forkJoin(subItems).subscribe(result => {
            location.reload();
        })

        this.confirmDeleteModal.close();
    }

    onClickImportBtn(type: Number): void {
        this.import = new Import()
        this.import.type = type;
        this.import.title = "Import Job Group";
    }
}