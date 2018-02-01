import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobFulfilmentService } from "../services/jobFulfilment.service";
import { JobFulfilmentModel } from "../models/jobFulfilment.model";
import { WorkBayService } from "../../workBay/services/workBay.service";
import { JobFulfilmentItemModel } from "../models/jobFulfilmentItem.model";
import { JobTrackingModel } from "../models/jobTracking.model";
import { Utils } from "../../../commons/app.utils";
import { AppConfig } from "../../../config/app.config";
import { Constants } from "../../../config/app.constant";
import { Observable } from "rxjs/Observable";
import { AssignTechnicianSearchModel } from "../models/assignTechnicianSearch.model";
import { JobAssignedTechnicianModel } from "../models/jobAssignedTechnician.model";

declare var $: any;

@Component({
    selector: 'jobFulfilment-addUpdate',
    templateUrl: './jobFulfilmentAddUpdate.component.html',
    styleUrls: ['./jobFulfilmentAddUpdate.style.css']
})

export class JobFulfilmentAddUpdateComponent implements OnInit {
    jobFulfilment: JobFulfilmentModel = new JobFulfilmentModel();
    bays: any = [];
    selectedJobFulfilmentItemId: number;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private jobFulfilmentService: JobFulfilmentService,
        private workBayService: WorkBayService,
        private utils: Utils,
        private appConfig: AppConfig,
        private constants: Constants) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            var id = params['id'];

            Observable.forkJoin([this.jobFulfilmentService.getById(id),
            this.workBayService.getworkBays(0, Number.MAX_SAFE_INTEGER, null, null),])
                .subscribe(results => {
                    this.jobFulfilment = results[0];
                    this.bays = results[1].data.rows;
                    console.log(this.jobFulfilment);
                })

        });
    }

    addUpdate(from: any) {
        this.jobFulfilmentService.update(this.jobFulfilment).then(res => {
            this.router.navigate(['/jobFulfilment/Search']);
        });
    }

    startJob(item: JobFulfilmentItemModel) {
        this.addNewJobStatus(item, this.constants.Enums.JobTrackingStatus.START);
    }

    pauseJob(item: JobFulfilmentItemModel) {
        this.addNewJobStatus(item, this.constants.Enums.JobTrackingStatus.PAUSE);
    }

    completeJob(item: JobFulfilmentItemModel) {
        this.addNewJobStatus(item, this.constants.Enums.JobTrackingStatus.COMPLETE);
    }

    addNewJobStatus(item: JobFulfilmentItemModel, statusId: number) {
        var newJobTracking = new JobTrackingModel();
        var newStatus = this.utils.getEnum(this.constants.Enums.JobTrackingStatus.Items, statusId);
        newJobTracking.jobTrackingStatusId = newStatus.id;
        newJobTracking.jobTrackingStatusName = newStatus.description;
        if (item.jobTrackings && item.jobTrackings.length > 0) {
            var lastJobTracking = item.jobTrackings[item.jobTrackings.length - 1];
            lastJobTracking.endTime = new Date();
            newJobTracking.startTime = lastJobTracking.endTime;
        }
        else {
            item.jobTrackings = [];
            newJobTracking.startTime = new Date();
        }

        newJobTracking.endTime = null;

        item.jobTrackingLastStatusId = newJobTracking.jobTrackingStatusId;
        item.jobTrackings.push(newJobTracking);

        this.checkJobFulfilmentStatus();
    }

    showAssignTechnicianModal(item: JobFulfilmentItemModel) {
        this.selectedJobFulfilmentItemId = item.id;
        $('#assignTechnician-modal').modal();
    }

    assignTechnicianEvent(data: any) {
        var jobFulfilmentItemId = data.selectedJobFulfilmentItemId;
        var selectedAssignTechnicians = data.selectedAssignTechnicians as AssignTechnicianSearchModel[];
        var isApplyAll = data.isApplyAll;
        if (selectedAssignTechnicians.length > 0) {
            if (isApplyAll) {
                this.jobFulfilment.jobFulfilmentItems.forEach(item => {
                    var jobAssignedTechnicians = selectedAssignTechnicians.map(at => {
                        var jobAssignedTechnician = new JobAssignedTechnicianModel();
                        jobAssignedTechnician.employeeId = at.id;
                        jobAssignedTechnician.jobFulfilmentItemId = item.id;
                        jobAssignedTechnician.employeeName = at.technicianName;
                        jobAssignedTechnician.repairOrderId = this.jobFulfilment.repairOrderId;
                        return jobAssignedTechnician;
                    })

                    jobAssignedTechnicians.forEach(jt => {
                        var existTechician = item.jobAssignedTechnicians.filter(i => i.employeeId == jt.employeeId && !i.isDeleted).length > 0;
                        if (!existTechician)
                            item.jobAssignedTechnicians.push(jt);
                    })
                })
            }
            else {
                var item = this.jobFulfilment.jobFulfilmentItems.filter(i => i.id == jobFulfilmentItemId)[0];
                var jobAssignedTechnicians = selectedAssignTechnicians.map(at => {
                    var jobAssignedTechnician = new JobAssignedTechnicianModel();
                    jobAssignedTechnician.employeeId = at.id;
                    jobAssignedTechnician.jobFulfilmentItemId = jobFulfilmentItemId;
                    jobAssignedTechnician.employeeName = at.technicianName;

                    return jobAssignedTechnician;
                })

                jobAssignedTechnicians.forEach(jt => {
                    var existTechician = item.jobAssignedTechnicians.filter(i => i.employeeId == jt.employeeId && !i.isDeleted).length > 0;
                    if (!existTechician)
                        item.jobAssignedTechnicians.push(jt);
                })
            }
        }

         this.checkJobFulfilmentStatus();
    }

    removeJobAssignedTechnician(item: JobAssignedTechnicianModel) {
        item.isDeleted = true;
        this.checkJobFulfilmentStatus();
    }

    checkJobFulfilmentStatus() {
        var isFull = false;
        var isNew = false;
        var isPartilly = false;
        var statuses = [];
        for (var index = 0; index < this.jobFulfilment.jobFulfilmentItems.length; index++) {
            var item = this.jobFulfilment.jobFulfilmentItems[index];
            if (item.jobTrackings && item.jobTrackings.length > 0 &&
                item.jobTrackings[item.jobTrackings.length - 1].jobTrackingStatusId > this.constants.Enums.JobTrackingStatus.NEW) {
                statuses.push({
                    isFull: true
                });
                continue;
            }
            if (item.jobAssignedTechnicians && item.jobAssignedTechnicians.length > 0) {
                statuses.push({
                    isFull: true
                });
                continue;
            }
        }

        var status = this.utils.getEnum(this.constants.Enums.JobFulfilmentStatus.Items, this.constants.Enums.JobFulfilmentStatus.NEW);
        if (statuses.length > 0) {
            var count = statuses.filter(s => s.isFull).length;
            if (count == statuses.length) {
                status = this.utils.getEnum(this.constants.Enums.JobFulfilmentStatus.Items, this.constants.Enums.JobFulfilmentStatus.FULL);
            }
            else {
                status = this.utils.getEnum(this.constants.Enums.JobFulfilmentStatus.Items, this.constants.Enums.JobFulfilmentStatus.PARTILLY);
            }
        }

        this.jobFulfilment.jobFulfilmentStatusId = status.id;
        this.jobFulfilment.jobFulfilmentStatusName = status.description;
    }
}