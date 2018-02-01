export class ItemEnum {
    id: number;
    code: string;
    description: string;

    constructor(init?: Partial<ItemEnum>) {
        Object.assign(this, init);
    }
}