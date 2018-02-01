import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobPartService } from "../services/jobPart.service";
declare var $: any;

@Component({
    selector: "jobPart-addUpdate",
    templateUrl: './addUpdateJobPart.component.html',
    styleUrls: ['./addUpdateJobPart.style.css']
})

export class JobPartAddUpdateComponent implements OnInit {
    @Input() jobPart: any = {};
    jobPartObj = {}
    vehicleMakeList = []
    vehicleModelList = []
    vehicleVariantList = []
    jobList = []
    partList = []
    tableArray = []
    body: any
    obj: any
    objTable: any
    objTableList: any
    objList: any
    check: boolean

    constructor(private router: Router, private jobPartService: JobPartService) { }

    ngOnInit(): void {
        this.objList = {}
        this.objTableList = {}
        this.obj = {}
        this.objTable = {}
        this.getVehicleMake()
        this.body = {}
        this.getJob()
        this.getPart()
        $('#add-update-job-part-modal').on('shown.bs.modal', () => {
            this.tableArray = []
            this.vehicleModelList = []
            this.vehicleVariantList = []
            if (this.jobPart.jobPartId) {
                //update
                this.getObj()
                this.getObjTable(this.jobPart)
                this.getAllVehicleModel()
                this.getAllVehicleVariant()
                this.check = true
            } else {
                //add
                this.setDisableSelector()
                this.objList = {}
                this.check = false
            }

        });
    }

    getVehicleMake() {
        this.jobPartService
            .getVehicleMake()
            .retry(3)
            .subscribe(result => {
                this.vehicleMakeList = result.data;
            });
    }

    change(item: any) {
        this.getVehicleModel(item)
        if (item == 72) {
            this.setDisableModelVariant()
        } else {
            this.setEnableModelVariant()
        }
    }

    changeModel(item: any) {
        this.getVehicleVariant(item)
    }

    getVehicleModel(id: any) {
        this.body.id = id
        this.jobPartService
            .getVehicleModel(JSON.stringify(this.body))
            .retry(3)
            .subscribe(result => {
                this.vehicleModelList = result.data;
                this.body = {}
            });
    }

    getAllVehicleModel() {
        this.jobPartService
            .getAllVehicleModel()
            .retry(3)
            .subscribe(result => {
                this.vehicleModelList = result.data;
            });
    }

    getVehicleVariant(id: any) {
        this.body.id = id
        this.jobPartService
            .getVehicleVariant(JSON.stringify(this.body))
            .retry(3)
            .subscribe(result => {
                this.vehicleVariantList = result.data;
                this.body = {}
            });
    }

    getAllVehicleVariant() {
        this.jobPartService
            .getAllVehicleVariant()
            .retry(3)
            .subscribe(result => {
                this.vehicleVariantList = result.data;
            });
    }

    getJob() {
        this.jobPartService
            .getJobMaster()
            .retry(3)
            .subscribe(result => {
                this.jobList = result.data;
            });
    }

    getPart() {
        this.jobPartService
            .getPartMaster()
            .retry(3)
            .subscribe(result => {
                this.partList = result.data;
            });
    }

    getObj() {
        this.jobPartService
            .getById(this.jobPart)
            .retry(3)
            .subscribe(result => {
                this.obj = result.data;
                this.objList = {}
                this.objList.vehicleMake = this.obj.JobPartMaster.VehicleVariant.VehicleModel.VehicleMake.id;
                this.objList.vehicleModel = this.obj.JobPartMaster.VehicleVariant.VehicleModel.id;
                this.objList.vehicleVariant = this.obj.JobPartMaster.VehicleVariant.id;
                this.objList.jobId = this.obj.JobPartMaster.JobMaster.id
                this.objList.partId = this.obj.PartMaster.id
                this.objList.qty = this.obj.quantity
                //console.log(this.obj)
            });
    }

    getObjTable(obj: any) {
        this.tableArray = []
        this.jobPartService
            .getByJobId(obj)
            .retry(3)
            .subscribe(result => {
                this.objTable = result.data;
                this.objTable.forEach(element => {
                    this.objTableList = {}
                    this.objTableList.vehicleMake = element.JobPartMaster.VehicleVariant.VehicleModel.VehicleMake.description;
                    this.objTableList.vehicleModel = element.JobPartMaster.VehicleVariant.VehicleModel.description;
                    this.objTableList.vehicleVariant = element.JobPartMaster.VehicleVariant.description;
                    this.objTableList.jobDesc = element.JobPartMaster.JobMaster.description
                    this.objTableList.jobPartId = element.JobPartMaster.id
                    this.objTableList.partDesc = element.PartMaster.description
                    this.objTableList.partId = element.PartMaster.id
                    this.objTableList.qty = element.quantity
                    this.tableArray.push(this.objTableList)
                })
                console.log(this.objTable)
            });
    }

    //add new JobPart or Part
    addUpdate(form: any) {
        if (form.vehicleMake == 72) {
            form.vehicleModel = 201
            form.vehicleVariant = 202
        }
        console.log('add', JSON.stringify(form))
        this.setEnableSelector()

        this.jobPartService
            .create(JSON.stringify(form))
            .retry(3)
            .subscribe(result => {
                if (this.jobPart.jobPartId) {
                    setTimeout(() => {
                        this.getObjTable(this.jobPart)
                    }, 1000)
                } else {
                    setTimeout(() => {
                        this.getLatestJobPartMaster()
                    }, 1000)
                }
            });
    }

    addUpdateTable(form: any) {
        console.log('update', JSON.stringify(form))
        this.jobPartService
            .update(JSON.stringify(form))
            .retry(3)
            .subscribe(result => {
                setTimeout(() => {
                    this.getObj()
                }, 1000)

            });
    }

    getLatestJobPartMaster() {
        this.jobPartService
            .getLatestJobPartMaster()
            .retry(3)
            .subscribe(result => {
                this.body.jobPartId = result.data.id
                this.getObjTable(JSON.stringify(this.body))
                this.body = {}
            });
    }

    setDisableModelVariant() {
        $("#vehicleModelId").prop("disabled", true);
        $("#vehicleVariant").prop("disabled", true);
    }

    setEnableModelVariant() {
        $("#vehicleModelId").prop("disabled", false);
        $("#vehicleVariant").prop("disabled", false);
    }

    setEnableSelector() {
        $("#vehicleMakeId").prop("disabled", true);
        $("#vehicleModelId").prop("disabled", true);
        $("#vehicleVariant").prop("disabled", true);
        $("#jobId").prop("disabled", true);
    }

    setDisableSelector() {
        $("#vehicleMakeId").prop("disabled", false);
        $("#vehicleModelId").prop("disabled", false);
        $("#vehicleVariant").prop("disabled", false);
        $("#jobId").prop("disabled", false);
    }
}