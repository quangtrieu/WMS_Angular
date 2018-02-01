import { Component, OnInit } from '@angular/core';
import { QuantityControlService } from "../services/qualityControl.service";
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'quanlity-control-add-update',
    templateUrl: './addUpdateQualityControl.component.html',
    styleUrls: ['./addUpdateQualityControl.style.css']
})

export class AddUpdateQualityControlComponent implements OnInit {
    //detail
    private sub: any;
    obj: any
    id: number;
    jobFFItem: any
    subQcList: any
    qcList: any[]
    check: boolean

    //table
    titleArray: any[];
    brakeDiscList: any
    tyre: any
    brakelining: any
    serviceMaintenance: any
    interior: any
    battery: any
    engComp: any
    option: any
    group: any;
    create: any[]
    createItem: any
    createTableList: any
    idRO: any

    constructor(private router: Router, private route: ActivatedRoute, private quantityControl: QuantityControlService) { }
    ngOnInit(): void {
        //table
        this.option = []
        this.group = {}
        this.group.brakeDiscList = {}
        this.group.brakeDiscList.InspectionItems = []
        this.group.tyre = {}
        this.group.tyre.InspectionItems = []
        this.group.brakelining = {}
        this.group.brakelining.InspectionItems = []
        this.group.serviceMaintenance = {}
        this.group.serviceMaintenance.InspectionItems = []
        this.group.interior = {}
        this.group.interior.InspectionItems = []
        this.group.battery = {}
        this.group.battery.InspectionItems = []
        this.group.engComp = {}
        this.group.engComp.InspectionItems = []
        //detail
        this.check = true
        this.jobFFItem = {}
        this.obj = {}
        this.subQcList = {}
        this.qcList = []
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getData()
        });

        
        

    }

    changeData(list: any) {
        var filter = list.filter(select => select.status == 2)
        if (filter.length == 0) {
            this.check = false
        } else {
            this.check = true
        }
    }

    getData() {
        this.obj = {}
        this.obj.id = this.id
        this.quantityControl.getJobFF(JSON.stringify(this.obj)).retry(3)
            .subscribe(result => {
                console.log(result);
                this.qcList = []
                if (result.data != null) {
                    this.jobFFItem.ROId = result.data[0].JobFulfilment.RepairOrderMaster.id
                    this.jobFFItem.RONo = result.data[0].JobFulfilment.RepairOrderMaster.code
                    this.jobFFItem.customer = result.data[0].JobFulfilment.RepairOrderMaster.VehicleCustomer.Customer.name
                    this.jobFFItem.regis = result.data[0].JobFulfilment.RepairOrderMaster.VehicleCustomer.registrationNo
                    result.data.forEach(element => {
                        this.subQcList = {}
                        this.subQcList.id = element.id // set ID 
                        this.subQcList.jobCode = element.RepairOrderJob.JobMaster.code
                        this.subQcList.jobDes = element.RepairOrderJob.JobMaster.description
                        this.subQcList.status = element.jobFulfilmentItemStatusId
                        this.subQcList.remarks = element.remarks == null ? "" : element.remarks
                        this.qcList.push(this.subQcList)
                    })
                    this.changeData(this.qcList)
                    this.getAllTable();
                    this.getOption();
                }
            });
    }

    getOption() {
        this.quantityControl
            .getOption()
            .retry(3)
            .subscribe(result => {
                // console.log(result);
                this.option = result.data
            });
    }

    getAllTable() {
        this.quantityControl
            .getAllTable()
            .retry(3)
            .subscribe(result => {
                console.log(result);
                this.group.brakeDiscList = result.data[0];
                this.group.tyre = result.data[1];
                this.group.brakelining = result.data[2];
                this.group.serviceMaintenance = result.data[3];
                this.group.interior = result.data[4];
                this.group.battery = result.data[5];
                this.group.engComp = result.data[6];

                //chkExistInspectionQC
                this.idRO = {}
                this.idRO.id = this.jobFFItem.ROId
                this.quantityControl
                    .chkExistInspectionQC(JSON.stringify(this.idRO))
                    .retry(3)
                    .subscribe(result => {
                        if (result.data.length != 0) {
                            this.getDataInspectionQC(result.data)
                        } else {
                            this.setDefaultOption()
                        }
                    });

            });
    }
    //arrange data
    getDataInspectionQC(item: any) {
        this.group.brakeDiscList.InspectionCheckListItems.forEach(element => {
            item.forEach(result => {
                if (element.id == result.inspectionCheckListItemId) {
                    element.pdInspectionValueId = result.pdInspectionValueId;
                }
            })
        })
        this.group.tyre.InspectionCheckListItems.forEach(element => {
            item.forEach(result => {
                if (element.id == result.inspectionCheckListItemId) {
                    element.pdInspectionValueId = result.pdInspectionValueId;
                }
            })
        })
        this.group.brakelining.InspectionCheckListItems.forEach(element => {
            item.forEach(result => {
                if (element.id == result.inspectionCheckListItemId) {
                    element.pdInspectionValueId = result.pdInspectionValueId;
                }
            })
        })
        this.group.serviceMaintenance.InspectionCheckListItems.forEach(element => {
            item.forEach(result => {
                if (element.id == result.inspectionCheckListItemId) {
                    element.pdInspectionValueId = result.pdInspectionValueId;
                }
            })
        })
        this.group.interior.InspectionCheckListItems.forEach(element => {
            item.forEach(result => {
                if (element.id == result.inspectionCheckListItemId) {
                    element.pdInspectionValueId = result.pdInspectionValueId;
                }
            })
        })
        this.group.battery.InspectionCheckListItems.forEach(element => {
            item.forEach(result => {
                if (element.id == result.inspectionCheckListItemId) {
                    element.pdInspectionValueId = result.pdInspectionValueId;
                }
            })
        })
        this.group.engComp.InspectionCheckListItems.forEach(element => {
            item.forEach(result => {
                if (element.id == result.inspectionCheckListItemId) {
                    element.pdInspectionValueId = result.pdInspectionValueId;
                }
            })
        })
    }

    //set default pdInspectionValueId
    setDefaultOption() {
        this.group.brakeDiscList.InspectionCheckListItems.forEach(element => {
            element.pdInspectionValueId = 1;
        })
        this.group.tyre.InspectionCheckListItems.forEach(element => {
            element.pdInspectionValueId = 1;
        })
        this.group.brakelining.InspectionCheckListItems.forEach(element => {
            element.pdInspectionValueId = 1;
        })
        this.group.serviceMaintenance.InspectionCheckListItems.forEach(element => {
            element.pdInspectionValueId = 1;
        })
        this.group.interior.InspectionCheckListItems.forEach(element => {
            element.pdInspectionValueId = 1;
        })
        this.group.battery.InspectionCheckListItems.forEach(element => {
            element.pdInspectionValueId = 1;
        })
        this.group.engComp.InspectionCheckListItems.forEach(element => {
            element.pdInspectionValueId = 1;
        })
    }

    addUpdate(item: any, obj: any) {
        //detail
        var filter = obj.filter(select => select.status == 2)
        if (filter.length == 0) {
            //have table
            console.log("have table", item)
            console.log("have table", obj)
            this.updateJobFFItem(obj)
            this.updateTable(item)
        } else {
            //no table
            console.log("no table", obj)
            this.updateJobFFItem(obj)
        }

    }

    //update JobFFItem
    updateJobFFItem(item: any) {
        console.log(item)
        this.quantityControl
            .updateJobFFItem(JSON.stringify(item))
            .retry(3)
            .subscribe(result => {
                console.log(result);
            });
    }

    updateTable(item: any) {
        //table
        this.create = []
        item.battery.InspectionCheckListItems.forEach(element => {
            this.createItem = {}
            this.createItem.id = element.id
            this.createItem.role = element.pdInspectionValueId
            this.create.push(this.createItem)
        })
        item.brakeDiscList.InspectionCheckListItems.forEach(element => {
            this.createItem = {}
            this.createItem.id = element.id
            this.createItem.role = element.pdInspectionValueId
            this.create.push(this.createItem)
        })
        item.brakelining.InspectionCheckListItems.forEach(element => {
            this.createItem = {}
            this.createItem.id = element.id
            this.createItem.role = element.pdInspectionValueId
            this.create.push(this.createItem)
        })
        item.engComp.InspectionCheckListItems.forEach(element => {
            this.createItem = {}
            this.createItem.id = element.id
            this.createItem.role = element.pdInspectionValueId
            this.create.push(this.createItem)
        })
        item.interior.InspectionCheckListItems.forEach(element => {
            this.createItem = {}
            this.createItem.id = element.id
            this.createItem.role = element.pdInspectionValueId
            this.create.push(this.createItem)
        })
        item.serviceMaintenance.InspectionCheckListItems.forEach(element => {
            this.createItem = {}
            this.createItem.id = element.id
            this.createItem.role = element.pdInspectionValueId
            this.create.push(this.createItem)
        })
        item.tyre.InspectionCheckListItems.forEach(element => {
            this.createItem = {}
            this.createItem.id = element.id
            this.createItem.role = element.pdInspectionValueId
            this.create.push(this.createItem)
        })
        this.createTableList = {}
        this.createTableList.id = this.jobFFItem.ROId
        this.createTableList.data = this.create
        //update table
        this.quantityControl
            .create(JSON.stringify(this.createTableList))
            .retry(3)
            .subscribe(result => {
                console.log(result);
            });
    }
}