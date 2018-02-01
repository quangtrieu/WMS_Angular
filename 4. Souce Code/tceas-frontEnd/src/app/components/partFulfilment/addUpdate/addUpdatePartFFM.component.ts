import { Message } from 'primeng/primeng';
import { MessagesService } from './../../../commons/message.utils';
import { PagerUtils } from './../../../commons/pager.utils';
import { Utils } from './../../../commons/app.utils';
import { Router, ActivatedRoute } from '@angular/router';
import { PartFulfillmentService } from './../services/partFulfillment.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
    selector: "partffm-addUpdate",
    templateUrl: './addUpdatePartFFM.component.html',
    styleUrls: ['./addUpdatePartFFM.style.css']
})

export class PartFFMAddUpdateComponent implements OnInit {

    id: number;
    private sub: any;
    repairOrderPart: any;
    partIds: any;
    partInfomation: any;
    roPart: any;
    isPicking: boolean;
    isFulfillment: boolean;
    private msgs: Message[];
    
    constructor(private route: ActivatedRoute,
        private Utils: Utils,
        private router: Router,
        private partFulfillmentService: PartFulfillmentService,
        private messagesService: MessagesService,
        private slimLoadingBarService: SlimLoadingBarService) { }

    ngOnInit(): void {

        this.roPart = {};
        this.roPart.master = {};
        this.roPart.master.VehicleCustomer = {};
        this.roPart.part = [];
        this.roPart.part.PartMaster = {};
        this.roPart.history = [];

        this.repairOrderPart = {};
        this.partIds = "";
        this.partInfomation = [];
        this.isPicking = false;
        this.isFulfillment = false;

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        //display message when user create or update
        this.messagesService.msgItem.subscribe((val: Message[]) => {
            if (val) {
                this.msgs = val;
            }
        });

        if (this.id) {
            this.slimLoadingBarService.start(() => { });
            this.partFulfillmentService
                .getByROId(this.id)
                .retry(3)
                .subscribe(result => {
                    this.repairOrderPart = result.data;

                    this.repairOrderPart.master.fullfilledDateTime = this.Utils.getDateFromDateTime(this.repairOrderPart.master.fullfilledDateTime);
                    this.repairOrderPart.master.dateTimeIn = this.Utils.getDateFromDateTime(this.repairOrderPart.master.dateTimeIn);

                    // check history & load partsubtitutes
                    this.repairOrderPart.history = [];
                    this.repairOrderPart.part.forEach(element => {
                        element.isValid = true;
                        element.fullfillQty = 0;
                        if (element.PartFulfillments && element.PartFulfillments.length > 0) {
                            element.PartFulfillments.forEach(elementHistory => {
                                elementHistory.requestQty = element.requestQty;

                                this.repairOrderPart.history.push(elementHistory);
                            });
                        }
                        element.isExtend = false;
                        element.hasChild = false;
                        element.outStandingQty = parseInt(element.requestQty) - parseInt(element.fullfillQty);
                        this.partIds += element.id + ", ";
                        element.PartFulfillments = [];
                    });
                    
                    this.partIds = this.partIds.substr(0, this.partIds.lastIndexOf(','));
                    let partInfo: any = {};
                    partInfo.partListId = this.partIds;
                    partInfo.workshopId = 1;

                    this.partFulfillmentService
                        .getPartSubstitutes(partInfo)
                        .retry(3)
                        .subscribe(result => {
                            this.bindPartSubstitute(this.repairOrderPart.part, result.data);
                            partInfo.partListId = this.partIds;
                            this.partFulfillmentService
                                .getPartInfomation(partInfo)
                                .retry(3)
                                .subscribe(result => {
                                    this.partInfomation = result.data.rows;
                                    this.bindPartMasterStock(this.repairOrderPart.part);
                                    this.suggestionBin(this.repairOrderPart.part);
                                    this.roPart = this.repairOrderPart;
                                    this.slimLoadingBarService.complete();
                                });
                        });
                });
        }
    }

    public reloadData() {
        this.partFulfillmentService
        .getByROId(this.id)
        .retry(3)
        .subscribe(result => {
            this.repairOrderPart = result.data;

            this.repairOrderPart.master.fullfilledDateTime = this.Utils.getDateFromDateTime(this.repairOrderPart.master.fullfilledDateTime);
            this.repairOrderPart.master.dateTimeIn = this.Utils.getDateFromDateTime(this.repairOrderPart.master.dateTimeIn);

            // check history & load partsubtitutes
            this.repairOrderPart.history = [];
            this.repairOrderPart.part.forEach(element => {
                element.isValid = true;
                element.fullfillQty = 0;
                if (element.PartFulfillments && element.PartFulfillments.length > 0) {
                    element.PartFulfillments.forEach(elementHistory => {
                        elementHistory.requestQty = element.requestQty;

                        this.repairOrderPart.history.push(elementHistory);
                    });
                }
                element.isExtend = false;
                element.hasChild = false;
                element.outStandingQty = parseInt(element.requestQty) - parseInt(element.fullfillQty);
                this.partIds += element.id + ", ";
                element.PartFulfillments = [];
            });
        });
    }

    public bindPartSubstitute(part: any, partSubstitutes: any) {
        part.forEach(elementPart => {
            elementPart.PartSubstitutes = [];
            partSubstitutes.forEach(elementPartSubstitute => {
                if (elementPartSubstitute.partId == elementPart.partId) {
                    this.partIds += ", " + elementPartSubstitute.PartMaster.id;
                    elementPart.PartSubstitutes.push(elementPartSubstitute.PartMaster);
                }
            });
        });
    }

    private bindPartMasterStock(part) {
        part.forEach(elementPart => {
            // check infomation of part
            elementPart.PartStock = [];
            elementPart.Stocks = [];
            this.partInfomation.forEach(elementPartInfo => {
                if (elementPartInfo.partId == elementPart.partId) {
                    if(elementPartInfo.bin) {
                        elementPartInfo.bin.forEach(elementBin => {
                            elementPart.PartStock.push(elementBin);
                            elementPart.Stocks.push(elementBin);
                        });
                    }
                }
            });
        });
    }

    private suggestionBin(part: any) {
        // check part 
        part.forEach(elementPart => {
            this.suggestionBinPart(elementPart);
        });
    }

    private suggestionBinPart(part: any) {
        // check bin by part
        if(part.Stocks && part.Stocks.length > 0) {
            let maxValue = Math.max.apply(Math,part.Stocks.map(function(o){return o.quantity;}));
            let binSuggest = part.Stocks.filter(x => x.quantity == maxValue)[0];
            part.binId = binSuggest.binId;
            part.avaiableQty = maxValue;
            part.fullfillQty = 0;
            part.isValid = true;
        }        
    }

    /**
     * Bind avaiable quantity of part
     * @param index 
     */
    private bindQty(index: number) {
        let partDetail = this.roPart.part[index];
        let valueIndex = $("#bin_" + index).val();
        let qty = partDetail.Stocks.filter(x => x.binId == partDetail.binId)[0].quantity;
        partDetail.avaiableQty = qty;
        partDetail.fullfillQty = 0;
        partDetail.isValid = true;
    }

    /**
     * Bind bin list by part
     * @param index Bind 
     */
    private bindBin(index: number) {
        let partDetail = this.roPart.part[index];

        let partInfo: any = {};
        partInfo.partListId = partDetail.partSubstituteId + "";
        partInfo.workshopId = 1;

        this.partFulfillmentService
            .getPartInfomation(partInfo)
            .retry(3)
            .subscribe(result => {
                partDetail.Stocks = result.data.rows[0].bin;
                this.suggestionBinPart(partDetail);
            });
    }

    /**
     * Check fulfillQty
     * @param index 
     */
    private checkFulfill(index: number) {        
        let partDetail = this.roPart.part[index];
        if(partDetail.fullfillQty) {
            
        } else {
            partDetail.fullfillQty = "0";
        }

        let quantity = 0;
        if(partDetail.remainQty) {
            quantity = parseInt(partDetail.remainQty) - parseInt(partDetail.fullfillQty);
        } else {
            quantity = parseInt(partDetail.requestQty) - parseInt(partDetail.fullfillQty);
        }

        if(quantity < 0) {
            partDetail.isValid = false;
        } else {            
            partDetail.isValid = true;
        }
        partDetail.outStandingQty = quantity;

        // check picking
        this.checkPicking();
    }

    public addOrDeletePart(index: number, isDelete: boolean) {
        
        if (isDelete) {
            let part = this.roPart.part[index];
            
            if(index < this.roPart.part.length - 1) {
                //check previous item
                let nextPart = this.roPart.part[index + 1];
                if(part.partId == nextPart.partId && nextPart.hasChild == false) {
                    nextPart.remainQty = part.remainQty;
                    nextPart.outStandingQty = parseInt(nextPart.remainQty) - parseInt(nextPart.fullfillQty);
                }
            }
            this.roPart.part.filter(x => x.partId == part.partId && x.hasChild == true)[0].isMaxChild = false;
            this.roPart.part.splice(index, 1);
            if(this.roPart.part.filter(x => x.partId == part.partId && x.hasChild == false).length == 0) {
                this.roPart.part.filter(x => x.partId == part.partId && x.hasChild == true)[0].hasChild = false;
            }
        } else {
            let part = this.roPart.part[index];
            let tempPart: any = {};  
            let remainQty = 0;
            part.isMaxChild = false;
            if(part.hasChild) {//check part have child
                index += 1;
                
                let arrPartChild = this.roPart.part.filter(x => x.partId == part.partId && x.hasChild == false);
                if(arrPartChild.length == 1) {
                    part.isMaxChild = true;
                }
                part = arrPartChild[0];
            } else {
                part.hasChild = true;
            }
            remainQty = part.outStandingQty;
            tempPart = JSON.parse(JSON.stringify(part));
            tempPart.isExtend = true;
            tempPart.hasChild = false;
            tempPart.fullfillQty = "0";
            tempPart.remainQty = remainQty;
            this.roPart.part.splice(index + 1, 0, tempPart);
            
        }
    }

    public submitFulfillment() {
        this.slimLoadingBarService.start(() => { });
        let partFulfillment = [];
        let submitInfo: any = {};
        this.roPart.part.forEach(element => {
            if(element.fullfillQty) {
                let fullfillQty = parseInt(element.fullfillQty);
                if(fullfillQty > 0) {
                    if(submitInfo.repairOrderPartId) {                        
                        submitInfo.repairOrderPartId += this.repairOrderPart.master.id + ",";
                    } else {                         
                        submitInfo.repairOrderPartId = this.repairOrderPart.master.id + ",";
                    }

                    if(submitInfo.availableQty) {
                        submitInfo.availableQty += element.avaiableQty + ",";
                    } else {                        
                        submitInfo.availableQty = element.avaiableQty + ",";
                    }

                    if(submitInfo.binId) {
                        submitInfo.binId += element.binId + ",";
                    } else {                        
                        submitInfo.binId = element.binId + ",";
                    }

                    if(submitInfo.partId) {
                        if(element.partSubstituteId) {
                            submitInfo.partId += parseInt(element.partSubstituteId) + ",";
                        } else {
                            submitInfo.partId += element.partId + ",";
                        }
                    } else {                        
                        if(element.partSubstituteId) {
                            submitInfo.partId = parseInt(element.partSubstituteId) + ",";
                        } else {
                            submitInfo.partId = element.partId + ",";
                        }
                    }

                    if(submitInfo.fulfillmentQty) {
                        submitInfo.fulfillmentQty += fullfillQty + ",";
                    } else {                        
                        submitInfo.fulfillmentQty = fullfillQty + ",";
                    }

                    if(submitInfo.outstandingQty) {
                        submitInfo.outstandingQty += element.outStandingQty + ",";
                    } else {                        
                        submitInfo.outstandingQty = element.outStandingQty + ",";
                    }

                    if(submitInfo.roRequestQty) {
                        submitInfo.roRequestQty += element.requestQty + ",";
                    } else {                        
                        submitInfo.roRequestQty = element.requestQty + ",";
                    }

                    if(submitInfo.isSubstitutePart) {
                        if(element.partSubstituteId) {
                            submitInfo.isSubstitutePart += "1,";
                        } else {
                            submitInfo.isSubstitutePart += "0,";
                        }                        
                    } else {                        
                        if(element.partSubstituteId) {
                            submitInfo.isSubstitutePart = "1,";
                        } else {
                            submitInfo.isSubstitutePart = "0,";
                        }  
                    }

                    if(submitInfo.workshopId) {
                        submitInfo.workshopId += "1" + ",";
                    } else {                        
                        submitInfo.workshopId = "1" + ",";
                    }
                }
            }
        });

        submitInfo.repairOrderPartId = this.Utils.removeLastSymbol(submitInfo.repairOrderPartId, ",");
        submitInfo.availableQty = this.Utils.removeLastSymbol(submitInfo.availableQty, ",");
        submitInfo.binId = this.Utils.removeLastSymbol(submitInfo.binId, ",");
        submitInfo.partId = this.Utils.removeLastSymbol(submitInfo.partId, ",");
        submitInfo.fulfillmentQty = this.Utils.removeLastSymbol(submitInfo.fulfillmentQty, ",");
        submitInfo.outstandingQty = this.Utils.removeLastSymbol(submitInfo.outstandingQty, ",");
        submitInfo.workshopId = this.Utils.removeLastSymbol(submitInfo.workshopId, ",");
        submitInfo.roRequestQty = this.Utils.removeLastSymbol(submitInfo.roRequestQty, ",");
        submitInfo.isSubstitutePart = this.Utils.removeLastSymbol(submitInfo.isSubstitutePart, ",");
        submitInfo.createdBy = "";
        submitInfo.modifiedBy = "";
        submitInfo.collectedById = submitInfo.repairOrderPartId;
        submitInfo.collectedByName = submitInfo.repairOrderPartId;

        this.partFulfillmentService
            .updatePartFulfill(submitInfo)
            .retry(3)
            .subscribe(result => {
                if(result.success) {
                    this.messagesService.success(result.message);
                    this.isFulfillment = false;
                    
                } else {
                    this.messagesService.error(result.message);
                }
                this.slimLoadingBarService.complete();
            });
    }

    private checkPicking() {
        let partInvalid = "";
        let arrPartChild = this.roPart.part.filter(x => x.hasChild == true);
        if(arrPartChild.length > 0) {
            // check part have child
            arrPartChild.forEach(element => {
                let arrPart = this.roPart.part.filter(x => x.partId == element.partId);
                let requestQty = arrPart[0].requestQty;
                let sumFulfillQty = this.calculateSumFulfillQty(arrPart);
                if(parseInt(sumFulfillQty) != parseInt(requestQty)) {
                    partInvalid += element.partId + ","
                }
            });
        }

        // check part not have child
        let arrPart = this.roPart.part.filter(x => x.hasChild == false);
        if(arrPart.length > 0) {
            // check part have child
            arrPart.forEach(element => {
                let arrPart = this.roPart.part.filter(x => x.partId == element.partId);
                let requestQty = arrPart[0].requestQty;
                let sumFulfillQty = this.calculateSumFulfillQty(arrPart);
                if(parseInt(sumFulfillQty) != parseInt(requestQty)) {
                    partInvalid += element.partId + ","
                }
            });
        }

        this.isPicking = false;
        if(partInvalid == "") {
            this.isPicking = true;
        }
    }

    private calculateSumFulfillQty(part) {
        return part.reduce( function(a, b){
            return a + parseInt(b["fullfillQty"]);
        }, 0);
    }

    public submitPicking() {
        this.partFulfillmentService
            .confirmPicking(this.id)
            .retry(3)
            .subscribe(result => {
                if(result.success) {
                    this.messagesService.success(result.message);
                    this.isFulfillment = true;
                    this.isPicking = false;
                } else {
                    this.messagesService.error(result.message);
                }
                
            });
    }

}