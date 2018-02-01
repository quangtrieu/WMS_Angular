import { AutoCompleteUtils } from './../../../commons/autoComplete.utils';
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MessagesService } from './../../../commons/message.utils';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Message } from 'primeng/components/common/api';
import { FormGroup } from '@angular/forms';
import { AutoComplete } from "primeng/primeng";
import { ServicePackageService } from "../services/servicePackage.service";
import { saveAs } from 'file-saver'
declare var $: any;

@Component({
    selector: "servicePackage-upload",
    templateUrl: './upload.component.html'
})

export class UploadServicePackageComponent implements OnInit {

    obj: any;
    constructor(private router: Router,
        private service: ServicePackageService,
        private slimLoadingBarService: SlimLoadingBarService,
        private autoCompleteUtils: AutoCompleteUtils,
        private messagesService: MessagesService) { }

    ngOnInit(): void {
        
        this.obj = {};
    }

    onClickDownload() {
       
          this.service.download().subscribe(result => {
            if (!result) {
                this.messagesService.error('error');
                return;
            }
          //  result.blob();
            debugger;
            let file = result.blob();
            var blob = new Blob([result], { type: 'application/pdf' });
            saveAs(file, 'Export.pdf');
            // let thefile = {};
            // thefile = new Blob([result], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
            // debugger;
            // var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            // var blob = new Blob([result.d()], { type: contentType });
            //saveAs(thefile, 'Export.xlsx');
          });
     }

    onClickUpload() {
      var filePathInput: any = $("#filePath");
      let reader = new FileReader();
      var obj : any = {};
      if(filePathInput[0].files) {
        this.service.upload(filePathInput[0].files[0]).subscribe(result => {
          if (!result) {
              this.messagesService.error('error');
              return;
          }
          this.messagesService.success('OK')
          this.obj.indexsuccess = result.indexsuccess;
          this.obj.indexerror = result.indexerror;
          this.messagesService.reloadMainComponent(true);
        });
      }
   }
}