import { Component, OnInit, Input } from '@angular/core';
import { JobCode } from "../models/jobCode.model";
import { ActivatedRoute, Router } from '@angular/router';
import { JobCodeService } from "../services/jobCode.service";
import { JobGroupService } from "../../jobGroup/services/jobGroup.service";
declare var $: any;

@Component({
    selector: "jobCode-addUpdate",
    templateUrl: './addUpdateJobCode.component.html',
    styleUrls: ['./addUpdateJobCode.style.css']
})

export class JobCodeAddUpdateComponent implements OnInit {
    id: number;
    jobCode: any;
    jobGroups: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private jobCodeService: JobCodeService,
        private jobGroupService: JobGroupService) { }

    ngOnInit(): void {
        $('.datatable-addUpdateJobCode table').dataTable({
            filter: false,
            lengthMenu: [10, 25, 50, 75, 100, 200]
        });

        $(".datatable-addUpdateJobCode .dataTables_length select").select2({
            width: 80
        });

        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.jobCode = {};
        if (this.id > 0) {
            this.jobCodeService.getById(this.id).subscribe(result => {
                this.jobCode = result.data;
            })
        }
        this.jobGroups = [];
        this.jobGroupService.getAll(1, Number.MAX_SAFE_INTEGER, null).subscribe(result=>{
            this.jobGroups = result.data.rows;
        });
    }

    addUpdate(form: any) {
        form._submitted = true;
        if (form.valid) {
            if (this.jobCode.id == null) {
                 this.jobCodeService.add(this.jobCode).subscribe(result => {
                    if (result.success == 1)
                        this.router.navigate(['/jobCode/Search']);
                    else
                        this.jobCode.errorMessage = result.message;
                })
            }
            else {
                this.jobCodeService.update(this.jobCode).subscribe(result => {
                    if (result.success == 1)
                        this.router.navigate(['/jobCode/Search']);
                    else
                        this.jobCode.errorMessage = result.message;
                })
            }
        }
    }
}