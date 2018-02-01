import { ActivatedRoute } from '@angular/router';
import { NgForm } from "@angular/forms/forms";
import { GoodsReceivingService } from "../services/goodsReceiving.service";
import { AutoCompleteUtils } from './../../../commons/autoComplete.utils';
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MessagesService } from './../../../commons/message.utils';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Message } from 'primeng/components/common/api';
import { FormGroup } from '@angular/forms';

@Component({
    selector: "grn-addUpdate",
    templateUrl: './addUpdate.component.html',
    styleUrls: ['./addUpdate.style.css']
})

export class GoodsReceivingAddUpdateComponent implements OnInit {
    @Input()
    grnId: number;
    @Input() grn: any;
    parts: any = [];
    bins: any = [];
    @ViewChild('formGRN') formGRN: FormGroup;
    selectedVehicleMake: any = {};
    obj: any = {};
    private msgs: Message[];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private service: GoodsReceivingService,
        private autoCompleteUtils: AutoCompleteUtils,
        private messagesService: MessagesService,
        private slimLoadingBarService: SlimLoadingBarService) { }
    

    ngOnInit(): void {
        if (this.grn == null) {
            this.grn = {};
            this.grn.status = 1;
        }
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        this.messagesService.onInitData.subscribe((grn: any) => {
            this.formGRN.reset();
                this.service.getListPartByWorkShopId(1).retry(3).subscribe(result => {
                    this.parts = result.data;
                });
        });
        this.messagesService.onInitData.subscribe((grn: any) => {
            this.formGRN.reset();
                this.service.getListBinByWorkShopId(1).retry(3).subscribe(result => {
                    this.bins = result.data;
                });
        });
    }

    filterPart(isScrolling) {
        var autoComplete = $('p-autoComplete[name=part]');
        var currentPage = 1;
        if (!isScrolling) {
            this.autoCompleteUtils.setCurrentPage(autoComplete, currentPage)
        } else {
            currentPage = this.autoCompleteUtils.getCurrentPage(autoComplete);
        }
        var query = autoComplete.find('.ui-autocomplete-input').val();
        this.service.getListPartByWorkShopId(1).retry(3).subscribe(result => {
            this.autoCompleteUtils.setPageCount(autoComplete, result.data.count);
            this.parts = result.data;
        });
        this.autoCompleteUtils.loadMore(autoComplete, () => {
            this.filterPart(true);
        });
    }

    addUpdate(grn) {
        this.slimLoadingBarService.start(() => { });
            this.obj = {};
            this.obj.partId = grn.Part.id + '';
            this.obj.binId = grn.Bin.id + '';
            this.obj.workshopId = 1;
            this.obj.reservedQty = grn.qty + '';
            this.obj.createdBy = 'tc';
            this.obj.modifiedBy = 'tc';
            this.service.create(this.obj).retry(3).subscribe(result => {
                if (!result.success) {
                    this.messagesService.error('false');
                    return;
                }
                this.messagesService.success('true')
                this.onCompleted();
            });
    }

    onCompleted() {
        this.slimLoadingBarService.complete();
        this.router.navigate(['/goodsReceiving/Search']);
    }

    type = true;
    toggle() {
        this.type = !this.type;
    }

    public filterBin(isScrolling) {
        var autoCompleteModel = $('p-autoComplete[name=bin]');
        var currentPage = 1;
        if (!isScrolling) {
            this.autoCompleteUtils.setCurrentPage(autoCompleteModel, currentPage);
        } else {
            currentPage = this.autoCompleteUtils.getCurrentPage(autoCompleteModel);
        }
        let query = autoCompleteModel.find('.ui-autocomplete-input').val();
 
        this.service.getListBinByWorkShopId(1).retry(3).subscribe(result => {
            this.autoCompleteUtils.setPageCount(autoCompleteModel, result.data.count);
            this.bins = result.data;
        });
        this.autoCompleteUtils.loadMore(autoCompleteModel, () => {
            this.filterBin(true);
        });
    }
}