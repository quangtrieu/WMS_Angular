import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from "../models/invoice.model";
import { InvoiceService } from "../services/invoice.service";
declare const jQuery: any;
declare var $: any;
@Component({
    selector: "invoice-addUpdate",
    templateUrl: './addUpdateInvoice.component.html',
    styleUrls: ['./addUpdateInvoice.style.css']
})

export class InvoiceAddUpdateComponent implements OnInit {
    id: number;
    ro: number;
    invoice: Invoice;
    invoiceList: any;
    jobList: any;
    objJob: any;
    partList: any;
    objPart: any;
    summaryList: any;
    submitData: any;
    private sub: any;
    constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) { }

    ngOnInit(): void {
        this.invoiceList = {};
        this.jobList = [];
        this.objJob = {}
        this.partList = [];
        this.objPart = {};
        this.summaryList = {};
        this.submitData = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.ro = +params['ro'];
        });
        this.invoice = new Invoice();
        if (!this.ro) {
            this.invoice.isUpdate = true;
            $("#roNoId").attr("disabled", true);
            //TODO: Update
            this.getInvoiceById()

        } else {
            if (this.ro != 2) {
                console.log("from Invoice");
            } else {
                console.log("from RO");
            }
        }
    }

    filterRO(event: any) {
        var roNo = event.target.value;
        if (roNo.length >= 3) {
            this.getROById(roNo);
        }
    }

    getROById(roId: any) {
        var obj: any = {}
        obj.code = roId;
        this.jobList = [];
        this.partList = [];

        this.invoiceService.getROById(JSON.stringify(obj)).retry(3).subscribe(result => {
            //if dara == null
            console.log(result)
            if (result.data != null) {
                this.invoiceList.serviceAdvisor = result.data.ServiceAdvisor == null ? "" : result.data.ServiceAdvisor.name
                this.invoiceList.customerName = result.data.VehicleCustomer.Customer.name
                this.invoiceList.sender = result.data.VehicleCustomer.Customer.contact
                this.invoiceList.reg = result.data.VehicleCustomer.registrationNo
                this.invoiceList.chas = result.data.VehicleCustomer.Vehicle.chassisNo
                this.invoiceList.purchased = result.data.VehicleCustomer.Vehicle.purchaseDate
                this.invoiceList.roDateTime = result.data.dateTimeIn
                this.invoiceList.mobileNo = result.data.mobilePhoneNo
                this.invoiceList.senderMobileNo = result.data.mobilePhoneNo
                this.invoiceList.vehicle = result.data.VehicleCustomer.Vehicle.VehicleVariant.description
                this.invoiceList.engineNo = result.data.VehicleCustomer.Vehicle.engineNo

                //table Job
                result.data.RepairOrderJobs.forEach(element => {
                    this.objJob = {}
                    if (element.ServicePackageJob != null) {
                        this.objJob.package = element.ServicePackageJob.ServicePackageVariant.ServicePackageMaster.code
                    } else {
                        this.objJob.package = " "
                    }
                    //this.objJob.package = element.ServicePackageJob.ServicePackageVariant == null ? "" : element.ServicePackageJob.ServicePackageVariant.ServicePackageMaster.code
                    // this.objJob.package = element.ServicePackageJob.ServicePackageVariant.ServicePackageMaster.code
                    this.objJob.job = element.JobMaster.code;
                    this.objJob.jobType = element.JobMaster.description;
                    this.objJob.labor = element.labourCharge;
                    this.objJob.discout = element.discountAmt;
                    this.objJob.subTotal = element.subTotal;
                    this.jobList.push(this.objJob);
                })
                //table part
                result.data.RepairOrderParts.forEach(element => {
                    this.objPart = {}
                    this.objPart.job = element.JobMaster.code
                    this.objPart.part = element.PartMaster.code
                    this.objPart.partSource = element.PDPartSource.createdBy
                    this.objPart.requestQty = element.requestQty
                    this.objPart.unitPrice = element.unitPrice
                    this.objPart.discountAmt = element.discountAmt
                    this.objPart.subTotal = element.subTotal
                    this.partList.push(this.objPart)
                })

                //summary
                this.summaryList.totalLaburCharge = result.data.totalLabourCharge
                this.summaryList.laburDiscount = result.data.labourDiscount
                this.summaryList.totalPartAmt = result.data.totalPartAmt
                this.summaryList.partDiscount = result.data.partDiscount
                this.summaryList.additionalDiscount = result.data.additionalDiscount
                this.summaryList.totalBeforeTax = parseFloat(this.summaryList.totalLaburCharge) + parseFloat(this.summaryList.totalPartAmt)//count
                this.summaryList.taxAmt = result.data.taxAmt
                this.summaryList.totalAfterTaxAmt = result.data.totalAfterTaxAmt
                this.summaryList.totalAmountPayable = this.roundingNumber(parseFloat(this.summaryList.totalAfterTaxAmt));
                this.summaryList.roundingAdjustment = parseFloat(this.summaryList.totalAmountPayable) - parseFloat(this.summaryList.totalAfterTaxAmt)

                //submit data
                this.submitData.vehicleCustomerId = result.data.vehicleCustomerId
                this.submitData.repairOrderId = result.data.id
                this.submitData.workShopId = result.data.workShopId
                this.submitData.appointmentId = result.data.appointmentId
                this.submitData.dateTimeIn = result.data.dateTimeIn
                this.submitData.expectedDeliveryDateTime = result.data.expectedDeliveryDateTime
                this.submitData.isCustomerWaiting = result.data.isCustomerWaiting
                this.submitData.vinNo = result.data.vinNo
                this.submitData.vehicleChassisNo = result.data.vehicleChassisNo
                this.submitData.mobilePhoneNo = result.data.mobilePhoneNo
                this.submitData.previousMilleage = result.data.previousMilleage
                this.submitData.currentMilleage = result.data.currentMilleage
                this.submitData.customerRequest = result.data.customerRequest
                this.submitData.totalLabourCharge = result.data.totalLabourCharge
                this.submitData.totalPartAmt = result.data.totalPartAmt
                this.submitData.partDiscount = result.data.partDiscount
                this.submitData.additionalDiscount = result.data.additionalDiscount
                this.submitData.totalGoodwillAmt = result.data.totalGoodwillAmt
                this.submitData.taxAmt = result.data.taxAmt
                this.submitData.totalAfterTaxAmt = result.data.totalAfterTaxAmt
                this.submitData.createdDateTime = result.data.createdDateTime
                this.submitData.updatedDateTime = result.data.updatedDateTime
                this.submitData.serviceAdvisorId = result.data.serviceAdvisorId
                this.submitData.fullfilledBy = result.data.fullfilledBy
                this.submitData.fullfilledDateTime = result.data.fullfilledDateTime
                this.submitData.latestFullfilmentNo = result.data.latestFullfilmentNo
                this.submitData.remark = this.invoiceList.remarks
                this.submitData.thirdPartyId = this.invoiceList.thirdPT
                this.submitData.labourDiscount = result.data.labourDiscount
                this.submitData.parts = result.data.RepairOrderParts
                this.submitData.jobs = result.data.RepairOrderJobs
            } else {

            }

        });
    }

    getInvoiceById() {
        var obj: any = {}
        obj.id = this.id;
        this.invoiceService.getInvoiceById(JSON.stringify(obj)).retry(3).subscribe(result => {
            console.log(result)
            this.invoice = result.data;
            this.invoice.isUpdate = true;
            this.invoiceList.code = result.data.code;
            this.invoiceList.roNo = result.data.RepairOrderMaster.code
            this.invoiceList.serviceAdvisor = result.data.ServiceAdvisor == null ? "" : result.data.ServiceAdvisor.name
            this.invoiceList.customerName = result.data.RepairOrderMaster.VehicleCustomer.Customer.name
            this.invoiceList.sender = result.data.RepairOrderMaster.VehicleCustomer.Customer.contact
            this.invoiceList.reg = result.data.RepairOrderMaster.VehicleCustomer.registrationNo
            this.invoiceList.chas = result.data.RepairOrderMaster.VehicleCustomer.Vehicle.chassisNo
            this.invoiceList.purchased = result.data.RepairOrderMaster.VehicleCustomer.Vehicle.purchaseDate
            this.invoiceList.invoiceDateTime = result.data.createdDateTime
            this.invoiceList.remarks = result.data.remarks
            this.invoiceList.roDateTime = result.data.RepairOrderMaster.dateTimeIn
            this.invoiceList.mobileNo = result.data.RepairOrderMaster.mobilePhoneNo
            this.invoiceList.senderMobileNo = result.data.mobilePhoneNo
            this.invoiceList.vehicle = result.data.RepairOrderMaster.VehicleCustomer.Vehicle.VehicleVariant.description
            this.invoiceList.engineNo = result.data.RepairOrderMaster.VehicleCustomer.Vehicle.engineNo
            this.invoiceList.thirdPT = result.data.thirdPartyId

            //table Job
            result.data.InvoiceJobs.forEach(element => {
                this.objJob.package = element.ServicePackageJob.ServicePackageVariant.ServicePackageMaster.code
                this.objJob.job = element.JobMaster.code;
                this.objJob.jobType = element.JobMaster.description;
                this.objJob.labor = element.labourCharge;
                this.objJob.discout = element.discount;
                this.objJob.subTotal = element.subTotal;
                this.jobList.push(this.objJob)
            })

            //table part
            result.data.InvoiceParts.forEach(element => {
                this.objPart.job = element.JobMaster.code
                this.objPart.part = element.PartMaster.code
                this.objPart.partSource = element.PDPartSource.createdBy
                this.objPart.requestQty = element.requestQty
                this.objPart.unitPrice = element.unitPrice
                this.objPart.discountAmt = element.discountAmt
                this.objPart.subTotal = element.subTotal
                this.partList.push(this.objPart)
            })

            //summary
            this.summaryList.totalLaburCharge = result.data.RepairOrderMaster.totalLabourCharge
            this.summaryList.laburDiscount = result.data.RepairOrderMaster.labourDiscount
            this.summaryList.totalPartAmt = result.data.RepairOrderMaster.totalPartAmt
            this.summaryList.partDiscount = result.data.RepairOrderMaster.partDiscount
            this.summaryList.additionalDiscount = result.data.RepairOrderMaster.additionalDiscount
            this.summaryList.totalBeforeTax = parseFloat(this.summaryList.totalLaburCharge) + parseFloat(this.summaryList.totalPartAmt)//count
            this.summaryList.taxAmt = result.data.RepairOrderMaster.taxAmt
            this.summaryList.totalAfterTaxAmt = result.data.RepairOrderMaster.totalAfterTaxAmt
            this.summaryList.totalAmountPayable = parseFloat(this.summaryList.totalBeforeTax) - parseFloat(this.summaryList.totalAfterTaxAmt)
            this.summaryList.roundingAdjustment = parseFloat(this.summaryList.totalAmountPayable) - parseFloat(this.summaryList.totalAfterTaxAmt)

        });
    }

    roundingNumber(x: number) {
        return Math.round(x * 100) / 100;
    }


    addUpdate() {
        console.log(JSON.stringify(this.submitData))
        this.invoiceService.create(JSON.stringify(this.submitData)).retry(3).subscribe(result => {
            console.log(result)
        })
    }

    checkBox() {
        if ($('#chkbox').is(":checked")) {
            //console.log("checked");
            $("#thirdPT").attr("disabled", false);
        } else {
            //console.log("unChecked");
            $("#thirdPT").attr("disabled", true);
        }
    }

}