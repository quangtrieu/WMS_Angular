import { Component, OnInit, ViewChild } from '@angular/core';
import { Import } from "../../shared/models/import.model";
import { DataTableParam, DataTableSource } from "../../../commons/datatable.utils";
import { POService } from "../services/po.service";
import { SearchViewModel } from "../../shared/models/searchView.model";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { PagerUtils } from "../../../commons/pager.utils";
import { Constants } from "../../../config/app.constant";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SortColumn } from "../../shared/models/sortColumn.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


declare var $: any;

@Component({
    selector: "po-search",
    templateUrl: './search.component.html',
    styleUrls: ['./search.style.css']
})

export class POSearchComponent implements OnInit {

    @ViewChild('modalDelete')
    modalDelete: ModalComponent;
    form: FormGroup;
    // private variable
    pageSizeObjects: Array<any>;
    typeObjects: Array<any>;
    statusObjects: Array<any>;
    selectedPageSize: any;
    customer: any;
    sortedColumn: SortColumn;

    // array of all items to be paged
    private customerList: any[];
    pager: any = {
        currentPage: 1,
        pageSize: this.constant.PAGE_SIZE_DEFAULT,
        totalPages: 0,
    };

    constructor(private router: Router, 
        private service: POService,
        private fb: FormBuilder,
        private constant: Constants, private pagerUtils: PagerUtils,
        private slimLoadingBarService: SlimLoadingBarService) {this.createForm(); }

    createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            avatar: null
        });
        }
    ngOnInit(): void {
        this.customer = {};
        this.sortedColumn = new SortColumn(null, true);
    }

    // upload() {
    //     this.slimLoadingBarService.start(() => { });
    //     debugger
    //     var filePathInput: any = $("#filePath");
    //     if (filePathInput[0].files) {
    //         var file: any = filePathInput[0].files[0];
    //         let _formData = new FormData();
    //         _formData.append('name', file, file.name);
    //         _formData.append('file', file, file);
    //         this.service.upload(_formData);
    //     }
    // }

    upload() {
        var filePathInput: any = $("#filePath");
        let reader = new FileReader();
        var obj : any = {};
        if(filePathInput[0].files) {
          this.service.upload(filePathInput[0].files[0]);
        }
    }
}