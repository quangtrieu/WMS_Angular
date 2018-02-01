import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class MessagesService {
    public loadData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public onInitData: BehaviorSubject<any> = new BehaviorSubject<any>(false);
    public msgItem: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
    private msgItems: Message[];
    message: any;

    constructor(private translate: TranslateService) { }

    clearMessages(msg: Message) {
        this.msgItems = [];
    }

    reloadMainComponent(isLoadData: boolean) {
        if (isLoadData)
            this.loadData.next(isLoadData);
    }

    loadChildrenComponent(data: any) {
        if (data)
            this.onInitData.next(data);
    }

    success(msg: string) {
        this.message = {}
        this.message.summary = this.translate.get("MSG_COMMON.SUMMARY_SUCCESS");
        this.message.msg = this.translate.get(msg.replace(/-/g, "."));
        this.emitMessage({ severity: 'success', summary: this.message.summary.value, detail: this.message.msg.value });
    }

    error(msg: string) {
        this.message = {}
        this.message.summary = this.translate.get("MSG_COMMON.SUMMARY_ERROR");
        this.message.msg = this.translate.get(msg);
        this.emitMessage({ severity: 'error', summary: this.message.summary.value, detail: this.message.msg.value });
    }

    getTranslate(key: String) {
         this.translate.get("" + key).subscribe((val: Message[]) => {
            if (val) {
                return val;
            }
        });
    }

    emitMessage(msg: Message) {
        this.msgItems = [];
        let refList: Message[] = this.nextMessage(msg);
        this.msgItem.next(refList);
    }

    private nextMessage(msg: Message): Message[] {
        this.msgItems.push(msg);
        return this.msgItems;
    }
}
