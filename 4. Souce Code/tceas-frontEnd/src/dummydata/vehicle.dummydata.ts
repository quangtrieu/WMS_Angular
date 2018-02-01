export class VehicleDummyData {
    id: string;
    vehicleRegistrationNo: string;
    vehicleMake: string;
    verhicleModel: string;
    modelVariant: string;
    registrationDate: string;
    vinNo: string;
    chassisNo: string;
    engineNo: string;
    warrantyPeriod: string;
    warrantyMileages: string;
    purchaseDate: string;
    agingDays: string;
    constructor(init?:Partial<VehicleDummyData>) {
        Object.assign(this, init);
    }
}