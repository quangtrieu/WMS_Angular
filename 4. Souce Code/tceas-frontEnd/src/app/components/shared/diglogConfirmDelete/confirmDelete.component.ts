import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";

declare var $: any;

@Component({
    selector: 'confirm-delete-modal',
    templateUrl: './confirmDelete.component.html',
})

export class ConfirmDeleteComponent implements OnInit {
    @ViewChild('confirmDeleteModal')
    confirmDeleteModal: ModalComponent;

    @Output() openConfirmDeleteModal = new EventEmitter();

    @Input()
    confirmDeteleEvent: any;
    @Input()
    title: string;
    @Input()
    message: string;

    ngOnInit(): void {
    }

    confirmDelete(): void {
        this.confirmDeteleEvent.emit();
    }
}
