import { Message, LazyLoadEvent } from 'primeng/primeng';
import { MessagesService } from './../../../commons/message.utils';
import { VehicleService } from './../services/vehicle.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { PagerUtils } from './../../../commons/pager.utils';
import { Constants } from './../../../config/app.constant';
import { SortColumn } from './../../shared/models/sortColumn.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
    selector: "vehicleProfile-Search",
    templateUrl: './searchVehicle.component.html',
    styleUrls: ['./searchVehicle.style.css']
})

export class VehicleSearchComponent implements OnInit, AfterViewInit{
    vehicle: any;

    @ViewChild('modalDelete')
    modalDelete: ModalComponent;
    // private variable
    vehicleSearch: any;
    sortedColumn: SortColumn;
    private msgs: Message[];

    pageSizeObjects: Array<any>;
    typeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    //vehicle: any;

    // array of all items to be paged
    private vehicleList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalRecords: 0,
    };
    
    constructor(public router: Router, private constant: Constants, private pagerUtils: PagerUtils,
        private messagesService: MessagesService,
        private translate: TranslateService,
        private slimLoadingBarService: SlimLoadingBarService, private vehicleService: VehicleService,) { }

    ngOnInit(): void {
        this.vehicleSearch = {};
        this.sortedColumn = new SortColumn(null, true);
        this.loadVehicleList(1, this.constant.PAGE_SIZE_DEFAULT);

       this.loadVehicleList(1, this.constant.PAGE_SIZE_DEFAULT);

        //display message when user create or update
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        //reload data when user create or update
        this.messagesService.loadData.subscribe((isLoadMain: boolean) => {
            if (isLoadMain) {
                this.loadVehicleList(1, this.constant.PAGE_SIZE_DEFAULT);
            }
        });
        this.loadDropdowlistStatus();
        
    }

    loadVehicleList(curentPage: number, pageSize: number) {
        this.vehicleService
            .getAll(curentPage, pageSize, this.vehicleSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {
                if (result != null && result.data != null && result.data.rows != null) {
                   
                    result.data.rows.forEach(element => {
                        
                        element.customerName = element.Customer.name;
                        element.vehicleMake = element.Vehicle.VehicleVariant.VehicleModel.VehicleMake.code + ' - ' + element.Vehicle.VehicleVariant.VehicleModel.VehicleMake.description;
                        element.vehicleModel = element.Vehicle.VehicleVariant.VehicleModel.code + ' - ' + element.Vehicle.VehicleVariant.VehicleModel.description;
                        element.modelVariant = element.Vehicle.VehicleVariant.description;
                        element.engineNo = element.Vehicle.engineNo;
                        element.vinNo = element.Vehicle.vinNo;
                        element.chassisNo = element.Vehicle.chassisNo;
                        element.status = element.Vehicle.status;
                    });
                    this.vehicleList = result.data.rows;
                    console.log("list: ", this.vehicleList);
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
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

    loadVehicleLazy(event: LazyLoadEvent) {
        //imitate db connection over a network
        setTimeout(() => {
            var currentPage = (event.first / event.rows) + 1;
            var pageSize = event.rows;

            this.pager.currentPage = currentPage;
            this.pager.pageSize = pageSize;
            this.convertSortFilterModel(event);

            this.loadVehicleList(currentPage, pageSize);
        }, 250);
    }

    convertSortFilterModel(event) {
        if (this.vehicleSearch == null) {
            this.vehicleSearch = {};
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.vehicleSearch.registrationNo = filters.registrationNo ? filters.registrationNo.value : null;
                this.vehicleSearch.customerName = filters.customerName ? filters.customerName.value : null;
                this.vehicleSearch.vehicleMake = filters.vehicleMake ? filters.vehicleMake.value : null;
                this.vehicleSearch.vehicleModel = filters.vehicleModel ? filters.vehicleModel.value : null;
                this.vehicleSearch.vehicleVariant = filters.modelVariant ? filters.modelVariant.value : null;
                this.vehicleSearch.vinNo = filters.vinNo ? filters.vinNo.value : null;
                this.vehicleSearch.chassisNo = filters.chassisNo ? filters.chassisNo.value : null;
                this.vehicleSearch.engineNo = filters.engineNo ? filters.engineNo.value : null;
                this.vehicleSearch.status = filters.status ? filters.status.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    // loadVehicleList() {
    //     this.slimLoadingBarService.start(() => { });
    //     this.vehicleService
    //         .getAll(this.vehicle, this.sortedColumn, this.pager.currentPage, this.pager.pageSize)
    //         .retry(3)
    //         .subscribe(result => {
    //             if(result.success) {
    //                 result.data.rows.forEach(element => {
    //                     element.registrationNo = element.registrationNo;
    //                     element.customerName = element.Customer.name;
    //                     element.vehicleMake = element.Vehicle.VehicleVariant.VehicleModel.VehicleMake.description;
    //                     element.vehicleModel = element.Vehicle.VehicleVariant.VehicleModel.description;
    //                     element.modelVariant = element.Vehicle.VehicleVariant.description;
    //                     element.engineNo = element.Vehicle.engineNo;
    //                     element.vinNo = element.Vehicle.vinNo;
    //                     element.chassisNo = element.Vehicle.chassisNo;
    //                     element.status = element.Vehicle.status;
    //                 });
    //                 this.vehicleList = result.data.rows;
    //                 var totalPages = result.data.count;
    //                 this.pager.totalPages = totalPages;

    //                 this.pager = this.pagerUtils.getPager(totalPages, this.pager.currentPage, this.pager.pageSize);
    //                 this.slimLoadingBarService.complete();
    //                 this.sortedColumn.isAsc = this.sortedColumn.isAsc ? false : true;
    //             } else {
    //                 //Todo: show notify for message response
    //             }
    //         });
    // }

    // setPage(curentPage: number) {
    //     this.pager.currentPage = curentPage;
    //     this.loadVehicleList();
    // }

    // loadDropdownPageSize() {
    //     this.pageSizeObjects = [{ id: 1, text: 10 }, { id: 2, text: 20 }, { id: 3, text: 30 }, { id: 4, text: 50 }];
    //     this.selectedPageSize = this.pageSizeObjects[0];
    // }

    // loadDropdownStatus() {
    //     this.statusObjects = [{ id: 1, text: "" }, { id: 2, text: this.constant.YES }, { id: 3, text: this.constant.NO }];
    // }

    // public onSortColumn(columnName: String, isAsc: Boolean) {
    //     this.sortedColumn = new SortColumn(columnName, isAsc);
    //     this.sortedColumn.classActive = isAsc ? 'sorting_asc' : 'sorting_desc';

    //     this.pager.currentPage = 1;
    //     this.loadVehicleList();
    // }


    onClickAddUpdate(event: any): void {
        if (this.vehicle != null) {
            this.vehicle.isUpdate = true;
        }

        if (event != null) {
            var filters = event.filters;
            var sortField = event.sortField;

            if (filters != null) {
                this.vehicleSearch.code = filters.code ? filters.code.value : null;
                this.vehicleSearch.description = filters.description ? filters.description.value : null;
                this.vehicleSearch.status = filters.status ? filters.status.value : null;
                this.vehicleSearch.createdBy = filters.createdBy ? filters.createdBy.value : null;
                this.vehicleSearch.updatedBy = filters.updatedBy ? filters.updatedBy.value : null;
            }
            if (sortField != null) {
                var isAsc = event.sortOrder === 1 ? true : false;
                this.sortedColumn = new SortColumn(sortField, isAsc);
            }
        }
    }

    // setPage(curentPage: number) {
    //     this.pager.currentPage = curentPage;
    //     this.loadVehicleList();
    // }

    // loadDropdownPageSize() {
    //     this.pageSizeObjects = [{ id: 1, text: 10 }, { id: 2, text: 20 }, { id: 3, text: 30 }, { id: 4, text: 50 }];
    //     this.selectedPageSize = this.pageSizeObjects[0];
    // }

    // loadDropdownStatus() {
    //     this.statusObjects = [{ id: 1, text: "" }, { id: 2, text: this.constant.YES }, { id: 3, text: this.constant.NO }];
    // }

    // public onSortColumn(columnName: String, isAsc: Boolean) {
    //     this.sortedColumn = new SortColumn(columnName, isAsc);
    //     this.sortedColumn.classActive = isAsc ? 'sorting_asc' : 'sorting_desc';

    //     this.pager.currentPage = 1;
    //     this.loadVehicleList();
    // }


    // onClickAddUpdate(vehicle: any): void {
    //     if (this.vehicle != null) {
    //         this.vehicle.isUpdate = true;
    //     }
    // }

    // public onChangePageSize(e: any): void {
    //     this.selectedPageSize = this.pageSizeObjects[e.value - 1];
    //     if (this.selectedPageSize != null) {
    //         this.pager.pageSize = this.selectedPageSize.text;
    //         this.pager.currentPage = 1;
    //         this.loadVehicleList();
    //     }
    // }

    // public onChangeStatus(e: any): void {
    //     var selectedStatus = this.statusObjects[e.value - 1];
    //     if (selectedStatus != null) {
    //         if (e.value == 1) {
    //             this.vehicle.status = null;
    //         } else {
    //             this.vehicle.status = (selectedStatus.text === this.constant.YES) ? 1 : 0;
    //         }
    //         this.pager.currentPage = 1;
    //         this.loadVehicleList();
    //     }
    // }

    // public keydownSearch(event: any) {
    //     if (event.keyCode == 13) {
    //         this.loadVehicleList();
    //     }
    // }

    // // check all checkbox
    // onCheckAll() {
    //     if ($('#chkAll').is(':checked')) {
    //         $('#chkAll').prop('checked', true);
    //         $('.chk').prop('checked', true);
    //     } else {
    //         $('#chkAll').prop('checked', false);
    //         $('.chk').prop('checked', false);
    //     }
    // }

    // // row checked 
    // onRowChecked() {

    //     var totalChk = $('.chk').length;

    //     var totalChkChecked = $('.chk:checkbox:checked').length;
    //     if (totalChkChecked != totalChk) {
    //         $('#chkAll').prop('checked', false);
    //     } else {
    //         $('#chkAll').prop('checked', true);
    //     }

    // }

    // // delete vehicle by click button on row
    // onDelete(info: any): void {
    //     var listValue = "";
    //     for (let element of $('.chk:checkbox:checked')) {
    //         listValue += element.value + ",";
    //     }
    //     listValue = listValue.substring(0, listValue.lastIndexOf(","));
    //     if (listValue) {
    //         $("#hdVehicleId").val(listValue);
    //         this.modalDelete.open();
    //     }
    // }

    // reloadVehicleData() {
    //     this.loadVehicleList();
    // }

    // // delete vehicle by row
    // deleteVehicle() {
    //     this.vehicleService
    //         .deleteVehicle($("#hdVehicleId").val())
    //         .retry(3)
    //         .subscribe(result => {
    //             this.modalDelete.dismiss();
    //             this.reloadVehicleData();
    //         });
    // }

}