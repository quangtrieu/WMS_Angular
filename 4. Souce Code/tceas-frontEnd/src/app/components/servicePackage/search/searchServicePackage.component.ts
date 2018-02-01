import { TranslateService } from '@ngx-translate/core';
import { SortColumn } from './../../shared/models/sortColumn.model';
import { MessagesService } from './../../../commons/message.utils';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ServicePackageService } from "../services/servicePackage.service";
import { Constants } from "../../../config/app.constant";
import { PagerUtils } from "../../../commons/pager.utils";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Message } from 'primeng/components/common/api';
import { LazyLoadEvent } from "primeng/primeng";
import { SelectItem } from "primeng/components/common/selectitem";

declare var $: any;

@Component({
    selector : "vehicleServicePackage-Search",
    templateUrl : './searchServicePackage.component.html',
    styleUrls:['./searchServicePackage.style.css']
})

export class ServicePackageSearchComponent implements OnInit, AfterViewInit {
    
        private msgs: Message[];
        statusObjects: Array<any>;
        servicePackageSearch: any;
        servicePackage: any;
        sortedColumn: SortColumn;
        private obj;
        brands: SelectItem[];
        // array of all items to be paged
        private servicePackageList: any[];
        pager: any = {
            currentPage: 1,
            pageSize: this.constant.PAGE_SIZE_DEFAULT,
            totalRecords: 0,
        };
    
        constructor(
            private service: ServicePackageService, private router: Router,
            private constant: Constants, private pagerUtils: PagerUtils,
            private slimLoadingBarService: SlimLoadingBarService,
            private messagesService: MessagesService,
            private translate: TranslateService) {
            this.msgs = [];
        }
    
        ngOnInit(): void {
            this.servicePackageSearch = {};
            this.sortedColumn = new SortColumn(null, true);
            this.loadservicePackage(1, this.constant.PAGE_SIZE_DEFAULT);
    
            //display message when user create or update
            this.messagesService.msgItem.subscribe((val: Message[]) => {
                if (val) {
                    this.msgs = val;
                }
            });
    
            //reload data when user create or update
            this.messagesService.loadData.subscribe((isLoadMain: boolean) => {
                if (isLoadMain) {
                    this.loadservicePackage(1, this.constant.PAGE_SIZE_DEFAULT);
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
    
        loadServicePackageLazy(event: LazyLoadEvent) {
            //imitate db connection over a network
            setTimeout(() => {
                var currentPage = (event.first / event.rows) + 1;
                var pageSize = event.rows;
    
                this.pager.currentPage = currentPage;
                this.pager.pageSize = pageSize;
                this.convertSortFilterModel(event);
    
                this.loadservicePackage(currentPage, pageSize);
            }, 250);
        }
    
        convertSortFilterModel(event) {
            if (this.servicePackageSearch == null) {
                this.servicePackageSearch = {};
            }
    
            if (event != null) {
                var filters = event.filters;
                var sortField = event.sortField;
    
                if (filters != null) {
                    this.servicePackageSearch.code = filters.code ? filters.code.value : null;
                    this.servicePackageSearch.description = filters.description ? filters.description.value : null;
                    this.servicePackageSearch.status = filters.status ? filters.status.value : null;
                    this.servicePackageSearch.createdBy = filters.createdBy ? filters.createdBy.value : null;
                    this.servicePackageSearch.updatedBy = filters.updatedBy ? filters.updatedBy.value : null;
                }
                if (sortField != null) {
                    var isAsc = event.sortOrder === 1 ? true : false;
                    this.sortedColumn = new SortColumn(sortField, isAsc);
                }
            }
        }

        onClickImportBtn(type: Number): void {
            $('#service-package-modal').modal();
        }
    
        loadservicePackage(curentPage: number, pageSize: number) {
            this.service
            .getServicePackages(curentPage, pageSize, this.servicePackageSearch, this.sortedColumn)
            .retry(3)
            .subscribe(result => {

                if (result != null && result.data != null && result.data.rows != null) {
                    this.servicePackageList = [];
                    result.data.rows.forEach(element => {
                        this.obj = {};
                        this.obj.id = element.id;
                        this.obj.code = element.code;
                        this.obj.description = element.description;
                        this.obj.type = element.PDPackageType.code;
                        this.obj.status = true;
                        this.servicePackageList.push(this.obj);
                    })
                    var totalPages = result.data.count;
                    this.pager.totalRecords = totalPages;
                }
            });
        }
    }