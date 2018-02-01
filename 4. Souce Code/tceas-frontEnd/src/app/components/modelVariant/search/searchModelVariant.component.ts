import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModelVariant } from "../models/modelVariant.model";
import { Import } from "../../shared/models/import.model";
import { Observable } from "rxjs/Rx";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { Router } from "@angular/router";
import { ModelVariantService } from "../services/modelVariant.service";
import { SortColumn } from './../../shared/models/sortColumn.model';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { MessagesService } from './../../../commons/message.utils';
import { TranslateService } from '@ngx-translate/core';
import { Message } from 'primeng/components/common/api';
import { Constants } from "../../../config/app.constant";
import { LazyLoadEvent } from "primeng/primeng";
declare var $: any;

@Component({
    selector: "searchModelVariant-Search",
    templateUrl: './searchModelVariant.component.html',
    styleUrls: ['./searchModelVariant.style.css']
})

export class SearchModelVariantComponent implements OnInit, AfterViewInit {
    private msgs: Message[];
    statusObjects: Array<any>;
    modelVariant: any
    selectedModelVariant: any;
    vehicleVariantSearch: any;
    sortedColumn: SortColumn;
    private vehicleVariantList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalRecords: 0,
    };
    import: Import
    @ViewChild('confirmDeleteModal')
    confirmDeleteModal: ModalComponent;

    constructor(private router: Router,
        private modelVariantService: ModelVariantService,
        private constant: Constants,
        private slimLoadingBarService: SlimLoadingBarService,
        private messagesService: MessagesService,
        private translate: TranslateService) { 
            this.msgs = [];
        }

    ngOnInit(): void {
        
        this.vehicleVariantSearch = {};
        this.sortedColumn = new SortColumn(null, true);
        this.loadVehicleVariant(1, this.constant.PAGE_SIZE_DEFAULT);

        //display message when user create or update
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        //reload data when user create or update
        this.messagesService.loadData.subscribe((isLoadMain: boolean) => {
            if (isLoadMain) {
                this.loadVehicleVariant(1, this.constant.PAGE_SIZE_DEFAULT);
            }
        });
        this.loadDropdowlistStatus();
    }

    resource: any;
    ngAfterViewInit(): void {
        //display item per page 
        this.resource = {};
        this.resource.pagingLabel = this.translate.get("PAGING_ITEM_PER_PAGE").subscribe((res: string) => {
            $('.ui-paginator-bottom').append('<span>' + res + '</span>');
        });
    }

    loadDropdowlistStatus() {
        this.statusObjects = [];
        this.statusObjects.push({ label: this.constant.All_STATUS, value: null });
        this.statusObjects.push({ label: this.constant.YES, value: '1' });
        this.statusObjects.push({ label: this.constant.NO, value: '0' });
    }

    loadVehicleVariant(curentPage: number, pageSize: number) {
        this.modelVariantService
            .getAll(curentPage, pageSize, this.vehicleVariantSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                    this.vehicleVariantList = result.data.rows;
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
    }

    loadVehicleVariantLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);

            this.loadVehicleVariant(currentPage, pageSize);
        }, 250);
    }

    convertSortFilterModel(event) {
        if (this.vehicleVariantSearch == null) {
            this.vehicleVariantSearch = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.vehicleVariantSearch.code = filters.code ? filters.code.value : null;
                this.vehicleVariantSearch.description = filters.description ? filters.description.value : null;
                this.vehicleVariantSearch.vehicleModelCode = filters.VehicleModelCode ? filters.VehicleModelCode.value : null;
                this.vehicleVariantSearch.vehicleMakeCode = filters.VehicleMakeCode ? filters.VehicleMakeCode.value : null;
                this.vehicleVariantSearch.status = filters.status ? filters.status.value : null;
                this.vehicleVariantSearch.createdBy = filters.createdBy ? filters.createdBy.value : null;
                this.vehicleVariantSearch.updatedBy = filters.updatedBy ? filters.updatedBy.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }


    // addUpdateModelVariant(id: number): void {
    //     if(id == 0){
    //          this.selectedModelVariant = {};
    //          $('#add-update-model-variant-modal').modal();
    //          return;
    //     }
    //     this.modelVariantService.getById(id).subscribe(result => {
    //         if (result.success == 1) {
    //             this.selectedModelVariant = result.data;
    //             $('#add-update-model-variant-modal').modal();
    //         }
    //     })
    // }

    onClickAddUpdate(id: number): void {
        this.modelVariant = {};
        if (id == null) {
            this.modelVariant.status = 1;
            this.messagesService.loadChildrenComponent(this.modelVariant);
            $('#add-update-model-variant-modal').modal();
        } else {
            this.modelVariant.id = id;
            this.modelVariant.isUpdate = true;
            this.messagesService.loadChildrenComponent(this.modelVariant);
            $('#add-update-model-variant-modal').modal();
        }
    }

    confirmDeleteModelVariants(): void {
        if ($('input[name="ckbModelVariant"]:checked').length > 0)
            this.confirmDeleteModal.open();
    }

    deleteModelVariants(): void {
        var items = $('input[name="ckbModelVariant"]:checked');
        var subItems = [];
        for (var i = 0; i < items.length; i++) {
            var subItem = this.modelVariantService.delete($(items[i]).val());
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
        this.import.title = "Import Model Variant";
    }

}