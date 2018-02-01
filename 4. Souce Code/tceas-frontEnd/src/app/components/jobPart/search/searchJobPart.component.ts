import { Component, OnInit, ViewChild } from '@angular/core';
import { Import } from "../../shared/models/import.model";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable } from "rxjs/Rx";
import { Router } from '@angular/router';
import { JobPartService } from "../services/jobPart.service";
import { Select2OptionData } from 'ng2-select2';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { PagerUtils } from "../../../commons/pager.utils";
import { Constants } from "../../../config/app.constant";
declare var $: any;

@Component({
    selector: "jobPart-Search",
    templateUrl: './searchJobPart.component.html',
    styleUrls: ['./searchJobPart.style.css']
})

export class JobPartSearchComponent implements OnInit {

    pageSizeObjects: Array<any>;
    selectedPageSize: any;
    jobPart: any;
    sortedColumn: SortColumn;

    private jobPartList: any[];
    jobPartAdd = []
    subList: any
    selectedJobPart: any;
    import: Import
    @ViewChild('confirmDeleteModal')
    confirmDeleteModal: ModalComponent;

    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(private router: Router, private jobPartService: JobPartService, private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService) { }

    ngOnInit(): void {
        this.selectedJobPart = {}
        this.jobPart = {};
        this.sortedColumn = new SortColumn(null, true);
        this.setPage(1);

    }

    loadJobPart(curentPage: number) {
        this.slimLoadingBarService.start(() => { });
        this.jobPartService
            .getAll(this.pager.currentPage, this.pager.pageSize, this.jobPart, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                this.jobPartList = result.data.rows

                this.jobPartList.forEach(element => {
                    element.JobPartItems.forEach(element1 => {
                        this.subList = {}
                        this.subList.id = element.id
                        this.subList.jobPartId = element1.jobPartId
                        this.subList.partId = element1.partId
                        this.subList.vehicleMake = element.VehicleVariant.VehicleModel.VehicleMake.description
                        this.subList.vehicleModel = element.VehicleVariant.VehicleModel.description
                        this.subList.modelVariant = element.VehicleVariant.description
                        this.subList.job = element.JobMaster.description
                        this.subList.part = element1.PartMaster.description
                        this.subList.qty = element1.quantity
                        this.jobPartAdd.push(this.subList)
                    })

                })
                // console.log(this.jobPartAdd)
            });
    }

    setPage(curentPage: number) {
        this.pager.currentPage = curentPage;
        this.loadJobPart(curentPage);
    }

    addUpdateJobPart(item: any): void {
        $('#add-update-job-part-modal').modal();
        if (item) {
            this.selectedJobPart.jobPartId = item.jobPartId;
            this.selectedJobPart.partId = item.partId;
        } else {
            this.selectedJobPart.jobPartId = null;
        }
    }

    confirmDeleteJobPart(): void {

    }

    deleteJobPart(): void {

    }

    onClickImportBtn(type: Number): void {
        this.import = new Import()
        this.import.type = type;
        this.import.title = "Import Job Part";
    }

    // check all checkbox
    onCheckAll() {
        if ($('#chkAll').is(':checked')) {
            $('#chkAll').prop('checked', true);
            $('.chk').prop('checked', true);
        } else {
            $('#chkAll').prop('checked', false);
            $('.chk').prop('checked', false);
        }
    }

    // row checked 
    onRowChecked() {

        var totalChk = $('.chk').length;

        var totalChkChecked = $('.chk:checkbox:checked').length;
        if (totalChkChecked != totalChk) {
            $('#chkAll').prop('checked', false);
        } else {
            $('#chkAll').prop('checked', true);
        }

    }

    // delete vehicle by click button on row
    onDelete(info: any): void {
        var listValue = "";
        for (let element of $('.chk:checkbox:checked')) {
            listValue += element.value + ",";
        }
        listValue = listValue.substring(0, listValue.lastIndexOf(","));
        if (listValue) {
            $("#hdVehicleId").val(listValue);
            this.confirmDeleteModal.open();
        }
    }
}