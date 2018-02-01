import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SortColumn } from './../../shared/models/sortColumn.model';
import { Import } from "../../shared/models/import.model";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { Router } from "@angular/router";
import { VehicleModelService } from "../services/vehicleModel.service";
import { Observable } from "rxjs/Rx";
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Select2OptionData } from 'ng2-select2';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Message } from 'primeng/components/common/api';
import { LazyLoadEvent } from "primeng/primeng";
import { SelectItem } from "primeng/components/common/selectitem";
import { MessagesService } from './../../../commons/message.utils';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@Component({
    selector: "searchVehicleModel-Search",
    templateUrl: './searchVehicleModel.component.html',
    styleUrls: ['./searchVehicleModel.style.css']
})

export class SearchVehicleModelComponent implements OnInit,AfterViewInit {
    vehicleModel: any;
    vehicleModelSearch: any;
    //selectedVehicleModelId: number;
    statusObjects: Array<any>;
    
    sortedColumn: SortColumn;
    private vehicleModelList: any[];
    private msgs: Message[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };
    import: Import
    @ViewChild('confirmDeleteModal')
    confirmDeleteModal: ModalComponent;

    constructor(private router: Router,
        private vehicleModelService: VehicleModelService,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService,
        private translate: TranslateService,
        private messagesService: MessagesService) {
        this.msgs = [];
    }

    ngOnInit(): void {
        this.vehicleModelSearch = {};
        this.sortedColumn = new SortColumn(null, true);

        this.loadVehicleModel(1, this.constant.PAGE_SIZE_DEFAULT);
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        //reload data when user add or update 
        this.messagesService.loadData.subscribe((isLoadMain: boolean) => {
            if (isLoadMain) {
                this.loadVehicleModel(1, this.constant.PAGE_SIZE_DEFAULT);
            }
        });

        this.loadDropdowlistStatus();
    }

    loadDropdowlistStatus() {
        this.statusObjects = [];
        this.statusObjects.push({ label: this.constant.All_STATUS, value: null });
        this.statusObjects.push({ label: this.constant.YES, value: '1' });
        this.statusObjects.push({ label: this.constant.NO, value: '0' });
    }

    resource: any;
    ngAfterViewInit(): void {
        //display item per page 
        this.resource = {};
        this.resource.pagingLabel = this.translate.get("PAGING_ITEM_PER_PAGE").subscribe((res: string) => {
            $('.ui-paginator-bottom').append('<span>' + res + '</span>');
        });
    }

    totalRecords: number;
    loadVehicleModelLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);

            this.loadVehicleModel(currentPage, pageSize);
        }, 250);
    }

    convertSortFilterModel(event) {
        if (this.vehicleModelService == null) {
            this.vehicleModelSearch = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.vehicleModelSearch.code = filters.code ? filters.code.value : null;
                this.vehicleModelSearch.description = filters.description ? filters.description.value : null;
                this.vehicleModelSearch.status = filters.status ? filters.status.value : null;
                this.vehicleModelSearch.vehicleMakeCode = filters.VehicleMakeCode ? filters.VehicleMakeCode.value : null;
                this.vehicleModelSearch.createdBy = filters.createdBy ? filters.createdBy.value : null;
                this.vehicleModelSearch.updatedBy = filters.updatedBy ? filters.updatedBy.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    loadVehicleModel(curentPage: number, pageSize: number) {
        this.vehicleModelService
            .getAll(curentPage, pageSize, this.vehicleModelSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.vehicleModelList = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });

    }

    onClickAddUpdate(id: number): void {
        this.vehicleModel = {};
        if (id == null) {
            
            this.vehicleModel.status = 1;
            this.vehicleModel.id = null;
            this.messagesService.loadChildrenComponent(this.vehicleModel);
            $('#add-update-vehicle-model-modal').modal();
        } else {
             this.vehicleModel.id = id;
             this.messagesService.loadChildrenComponent(this.vehicleModel);
             $('#add-update-vehicle-model-modal').modal();
        }
    }

    confirmDeleteVehicleModels(): void {

        if ($('input[name="ckbVehicleModel"]:checked').length > 0)
            this.confirmDeleteModal.open();
    }

    deleteVehicleModels(): void {
        var items = $('input[name="ckbVehicleModel"]:checked');
        var subItems = [];
        for (var i = 0; i < items.length; i++) {
            var subItem = this.vehicleModelService.delete($(items[i]).val());
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
        this.import.title = "Import Vehicle Model";
    }
}