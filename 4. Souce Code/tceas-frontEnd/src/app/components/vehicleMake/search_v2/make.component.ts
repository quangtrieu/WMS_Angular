import { MessagesService } from './../../../commons/message.utils';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VehicleMake } from "../models/vehicleMake.model";
import { VehicleMakeService } from "../services/vehicleMake.service";
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import { Message } from 'primeng/components/common/api';

declare var $: any;

@Component({
    selector: "make2-Search",
    templateUrl: './make.component.html',
    styleUrls: ['./make.style.css']
})

export class SearchVehicleMakeComponentV2 implements OnInit {
    private msgs: Message[];
    pageSizeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    vehicleMakeSearch: any;
    vehicleMake: any;
    vehicleModel: any;
    vehicleVariant: any;
    sortedColumn: SortColumn;

    // array of all items to be paged
    private vehicleMakeList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(
        private vehicleMakeService: VehicleMakeService, private router: Router,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService,
        private messagesService: MessagesService) {
        this.msgs = [];
    }

    ngOnInit(): void {
        this.vehicleMakeSearch = {};
        this.sortedColumn = new SortColumn(null, true);

        this.bindVehicleMake();
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        this.messagesService.loadData.subscribe((isLoadMain: boolean) => {
            if (isLoadMain) {
                this.bindVehicleMake();
            }
        });
    }

    bindVehicleMake() {
        this.setPage(1);
        this.loadDropdownPageSize();
        this.loadDropdownStatus();
    }

    loadVehicleMake(curentPage: number) {
        this.slimLoadingBarService.start(() => { });
        this.vehicleMakeService
            .getVehicleMakes(this.pager.currentPage, this.pager.pageSize, this.vehicleMakeSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.vehicleMakeList = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalPages = totalPages;

                    this.pager = this.pagerUtils.getPager(totalPages, curentPage, this.pager.pageSize);
                    this.slimLoadingBarService.complete();
                    this.sortedColumn.isAsc = this.sortedColumn.isAsc ? false : true;
                }
            });
    }

    setPage(curentPage: number) {
        this.pager.currentPage = curentPage;
        this.loadVehicleMake(curentPage);
    }

    loadDropdownPageSize() {
        this.pageSizeObjects = [{ id: 1, text: 10 }, { id: 2, text: 20 }, { id: 3, text: 30 }, { id: 4, text: 50 }];
        this.selectedPageSize = this.pageSizeObjects[0];
    }

    loadDropdownStatus() {
        this.statusObjects = [{ id: 1, text: "" }, { id: 2, text: this.constant.YES }, { id: 3, text: this.constant.NO }];
    }

    onClickAddUpdate(id: number): void {
        if (id == null) {
            this.vehicleMake = {};
            this.vehicleMake.status = 1;
            $('#addUpdate-VehicleMake-modal').modal();
        } else {
            this.vehicleMakeService.getById(id).retry(3).subscribe(result => {
                this.vehicleMake = result.data;
                this.vehicleMake.isUpdate = true;
                $('#addUpdate-VehicleMake-modal').modal();
            });
        }
    }

    onClickAddUpdateModel(id: number): void {
        if (id == null) {
            this.vehicleModel = {};
            this.vehicleModel.status = 1;
            $('#add-update-vehicle-model-modal').modal();
        } else {
            this.vehicleMakeService.getById(id).retry(3).subscribe(result => {
                this.vehicleModel = result.data;
                this.vehicleModel.isUpdate = true;
                $('#add-update-vehicle-model-modal').modal();
            });
        }
    }

    onClickAddUpdateVariant(id: number): void {
        if (id == null) {
            this.vehicleVariant = {};
            this.vehicleVariant.status = 1;
            $('#add-update-model-variant-modal').modal();
        } else {
            this.vehicleMakeService.getById(id).retry(3).subscribe(result => {
                this.vehicleMake = result.data;
                this.vehicleMake.isUpdate = true;
                $('#add-update-model-variant-modal').modal();
            });
        }
    }
    public onChangePageSize(e: any): void {
        this.selectedPageSize = this.pageSizeObjects[e.value - 1];
        if (this.selectedPageSize != null) {
            this.pager.pageSize = this.selectedPageSize.text;
            this.pager.currentPage = 1;
            this.loadVehicleMake(1);
        }
    }

    public onChangeStatus(e: any): void {
        var selectedStatus = this.statusObjects[e.value - 1];
        if (selectedStatus && selectedStatus.id === 1) {
            this.vehicleMakeSearch.status = null;
        } else {
            this.vehicleMakeSearch.status = (selectedStatus.text === this.constant.YES) ? 1 : 0;
        }
        this.pager.currentPage = 1;
        this.loadVehicleMake(1);
    }

    public onkeydownSearch(event: any) {
        if (event.keyCode == 13 || event.keyCode == 9) {
            this.loadVehicleMake(this.pager.currentPage);
        }
    }

    public onSortColumn(columnName: String, isAsc: Boolean) {
        this.sortedColumn = new SortColumn(columnName, isAsc);
        this.sortedColumn.classActive = isAsc ? 'sorting_asc' : 'sorting_desc';

        this.pager.currentPage = 1;
        this.loadVehicleMake(this.pager.currentPage);
    }
}