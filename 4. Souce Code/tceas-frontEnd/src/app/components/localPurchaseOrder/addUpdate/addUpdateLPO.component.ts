import { AutoCompleteUtils } from './../../../commons/autoComplete.utils';
import { Utils } from './../../../commons/app.utils';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LocalPurchaseOrderService } from './../services/localPurchaseOrder.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
    selector: "LPO-addUpdate",
    templateUrl: './addUpdateLPO.component.html',
    styleUrls: ['./addUpdateLPO.style.css']
})

export class LPOAddUpdateComponent implements OnInit {

    ROs: any;
    RO: any;
    ROSugesstion: any;
    sub: any;
    id: any;
    subletList: any;
    sublet: any;
    itemPurchase: any;
    subletId: any;
    lPO: any;
    pdData: any;
    lPOJob: any;
    lPOPart: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private Utils: Utils,
        private lPOService: LocalPurchaseOrderService,
        private slimLoadingBarService: SlimLoadingBarService,
        private autoCompleteUtils: AutoCompleteUtils) { }

    ngOnInit(): void {

        this.init();

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.lPO.isUpdate = true;
        });

        this.loadPDData();

        if (this.id) {
            this.lPOService
                .getById(this.id)
                .retry(3)
                .subscribe(result => {

                    console.log(result);

                    this.lPOJob = result.data.LocalPOJobs;
                    this.lPOPart = result.data.LocalPOParts;

                    this.ROSugesstion.code = result.data.RepairOrderMaster.code;
                    this.onLoadROInformation();

                    this.subletId = result.data.subletId;
                    this.lPO.pdDeliveryToId = result.data.pdDeliveryToId;
                    this.lPO.pdGSTId = result.data.pdGSTId;
                    this.lPO.pdPaymentTermId = result.data.pdPaymentTermId;
                    this.lPO.code = result.data.code
                    // this.lPO.date = 

                });
        }
    }

    init() {
        this.resetSublet();
        this.subletList = [];

        // instance sugestion
        this.ROSugesstion = {};

        this.lPO = {};
        this.pdData = {};
        this.subletId = "";

        this.RO = {};
        this.RO.VehicleCustomer = {};
        this.RO.VehicleCustomer.Customer = {};
        this.RO.VehicleCustomer.Vehicle = {};

        this.itemPurchase = {};

        this.lPO.isUpdate = false;

        this.lPOPart = [];
        this.lPOJob = [];
    }

    /**
     * load pd-data
     */
    loadPDData() {
        this.lPOService
            .getPDData()
            .retry(3)
            .subscribe(result => {
                this.pdData = result.data;
            });
    }

    /**
     * reset sublet information
     */
    resetSublet() {
        this.sublet = {};
        this.sublet.SubletJobs = [];
        this.sublet.SubletParts = [];

        if(this.lPO) {
            this.lPO.billTo = "";
        }
        
    }

    /**
     * load RO information by RO-code
     */
    onLoadROInformation() {
        this.lPOService
            .getROBySublet(this.ROSugesstion.code)
            .retry(3)
            .subscribe(result => {
                this.RO = result.data[0];
                this.RO.roDate = this.Utils.getDateFromDateTime(this.RO.dateTimeIn);
                this.onLoadSubletList();
            });
    }

    public filterROByCode(isLoadmore) {

        var autoComplete = $('p-autoComplete[name=code]');
        var currentPage = 1;
        if (!isLoadmore) {
            this.autoCompleteUtils.setCurrentPage(autoComplete, currentPage)
        } else {
            currentPage = this.autoCompleteUtils.getCurrentPage(autoComplete);
        }
        let query = autoComplete.find('.ui-autocomplete-input').val();
        this.lPOService.filterROs(currentPage, this.autoCompleteUtils.pageSize, { query: query }).subscribe((result) => {
            this.autoCompleteUtils.setPageCount(autoComplete, result.data.count);
            let items = result.data.rows;
            if (!isLoadmore) {
                this.ROs = [];
            }
            this.ROs = this.ROs.concat(items);
        });

        this.autoCompleteUtils.loadMore(autoComplete, () => {
            this.filterROByCode(true);
        });
    }

    /**
     * load sublet list via part & job
     */
    onLoadSubletList() {
        if (this.RO) {

            let partIds = "";
            let jobIds = "";

            // get part list
            this.RO.RepairOrderParts.forEach(element => {
                partIds += partIds + element.partId + ",";
            });
            partIds = this.Utils.removeLastSymbol(partIds, ",");

            // get job list
            this.RO.RepairOrderJobs.forEach(element => {
                jobIds += jobIds + element.jobId + ",";
            });
            jobIds = this.Utils.removeLastSymbol(jobIds, ",");

            this.lPOService
                .getSubletListByPartJob(partIds, jobIds)
                .retry(3)
                .subscribe(result => {
                    this.subletList = result.data;

                    if (this.id && this.id > 0) {
                        // bind part & job infomation
                        this.bindSubletInfomation();
                        this.bindSubletPartJob();
                    }
                });
        }
    }

    /**
     * bind part & job information to control
     */
    bindSubletInfomation() {
        if (this.subletId && this.subletId > 0) {
            let arrSublet = this.subletList.filter(x => x.id == this.subletId);
            if (arrSublet && arrSublet.length > 0) {
                this.sublet = arrSublet[0];
                this.lPO.billTo = "TAN CHONG EKSPRES AUTO SERVIS SDN. BHD.";
                this.sublet.SubletJobs.forEach(element => {
                    element.isPurchase = false;
                });
                this.sublet.SubletParts.forEach(element => {
                    element.isPurchase = false;
                });
            }
        } else {
            this.resetSublet();
        }
    }

    bindSubletPartJob() {
        if(this.id && this.id > 0) {
            if(this.lPOJob && this.lPOJob.length > 0) {
                this.lPOJob.forEach(element => {
                    let objJob = this.sublet.SubletJobs.filter(x => x.jobId == element.jobId);
                    if(objJob.length > 0) {
                        // objJob[0] = element;
                        objJob[0].isPurchase = true;
                        objJob[0].dONo = element.dONo;
                        objJob[0].remark = element.remark;
                        objJob[0].subletInvoiceNo = element.subletInvoiceNo;
                        objJob[0].subletInvoiceDate = element.subletInvoiceDate;
                    }
                });
            }

            if(this.lPOPart && this.lPOPart.length > 0) {
                this.lPOPart.forEach(element => {
                    let objPart = this.sublet.SubletParts.filter(x => x.partId == element.partId);
                    if(objPart.length > 0) {
                        objPart[0].isPurchase = true;
                        objPart[0].dONo = element.dONo;
                        objPart[0].remark = element.remark;
                        objPart[0].subletInvoiceNo = element.subletInvoiceNo;
                        objPart[0].subletInvoiceDate = element.subletInvoiceDate;
                    }
                });
            }
        }
    }

    filterPurchaseItem(arrItem, purchase) {
        let arrPurchase = [];
        if (arrItem) {
            arrItem.forEach(element => {
                if (element.isPurchase == purchase) {
                    arrPurchase.push(element);
                }
            });
        }

        return arrPurchase;
    }

    addItem() {
        //check purchase item
        if (this.itemPurchase) {
            this.sublet.SubletJobs.forEach(element => {
                if (element.jobId == this.itemPurchase.jobId) {
                    element.isPurchase = true;
                    element.retailPrice = element.JobMaster.JobPrices.length > 0 ? element.JobMaster.JobPrices[0].retailPrice : "0";
                }
            });
            this.sublet.SubletParts.forEach(element => {
                if (element.partId == this.itemPurchase.partId) {
                    element.isPurchase = true;
                    element.retailPrice = element.PartMaster.PartPrices.length > 0 ? element.PartMaster.PartPrices[0].retailPrice : "0";

                    // check requestQty
                    let arrPartRO = this.RO.RepairOrderParts.filter(x => x.partId == element.partId);
                    if (arrPartRO.length > 0) {
                        element.requestQty = arrPartRO[0].requestQty;
                    }
                }
            });
            this.itemPurchase = {};
        }
    }

    submitLPO() {
        this.lPO.subletId = this.sublet.id;
        this.lPO.repairOrderId = this.RO.id;

        this.lPO.jobs = [];
        this.lPO.parts = [];
        if (this.sublet && this.sublet.SubletJobs && this.sublet.SubletJobs.length > 0) {
            this.sublet.SubletJobs.filter(x => x.isPurchase == true).forEach(element => {
                let job: any = {};
                job.id = element.jobId;
                job.unitprice = element.unitPrice;
                this.lPO.jobs.push(job);
            });
        }
        if (this.sublet && this.sublet.SubletParts && this.sublet.SubletParts.length > 0) {
            this.sublet.SubletParts.filter(x => x.isPurchase == true).forEach(element => {
                let part: any = {};
                part.id = element.partId;
                part.unitprice = element.unitPrice;
                this.lPO.parts.push(part);
            });
        }

        this.lPOService
            .updateLPO(this.lPO)
            .retry(3)
            .subscribe(result => {
                console.log(result);
            });
    }

    deleteItem(itemId, isJob) {
        if (isJob) {
            if (this.sublet && this.sublet.SubletJobs.length > 0) {
                let arrJob = this.sublet.SubletJobs.filter(x => x.jobId == itemId)
                if (arrJob && arrJob.length > 0) {
                    arrJob[0].isPurchase = false;
                }
            }
        } else {

            if (this.sublet && this.sublet.SubletParts.length > 0) {
                let arrPart = this.sublet.SubletParts.filter(x => x.partId == itemId)
                if (arrPart && arrPart.length > 0) {
                    arrPart[0].isPurchase = false;
                }
            }
        }
    }


}