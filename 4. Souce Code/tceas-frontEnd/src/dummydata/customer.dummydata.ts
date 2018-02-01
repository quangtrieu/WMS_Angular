export class CustomerDummyData {
    id: string;
    customerName: string;
    customerType: string;
    customerIdType: string;
    idNo: string;
    address: string;
    mobilePhone: string;

    constructor(init?:Partial<CustomerDummyData>) {
        Object.assign(this, init);
    }
}

