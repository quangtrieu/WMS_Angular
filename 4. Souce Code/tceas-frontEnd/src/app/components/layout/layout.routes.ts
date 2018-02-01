import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'dashboard/main', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/components/dashboard/dashboard.module#DashboardModule' },
      //Master Data 
      { path: 'vehicleMake', loadChildren: 'app/components/vehicleMake/vehicleMake.module#VehicleMakeModule' },
      { path: 'vehicleModel', loadChildren: 'app/components/vehicleModel/vehicleModel.module#VehicleModelModule' },
      { path: 'modelVariant', loadChildren: 'app/components/modelVariant/modelVariant.module#ModelVariantModule' },
      { path: 'jobGroup', loadChildren: 'app/components/jobGroup/jobGroup.module#JobGroupModule' },
      { path: 'jobCode', loadChildren: 'app/components/jobCode/jobCode.module#JobCodeModule' },
      { path: 'jobPart', loadChildren: 'app/components/jobPart/jobPart.module#JobPartModule' },
      { path: 'customer', loadChildren: 'app/components/customer/customer.module#CustomerModule' },
      { path: 'vehicle', loadChildren: 'app/components/vehicle/vehicle.module#VehicleModule' },
      { path: 'partMaster', loadChildren: 'app/components/partMaster/partMaster.module#PartMasterModule' },
      { path: 'timeSlot/Search', loadChildren: 'app/components/timeSlotSetup/timeSlotSetup.module#TimeSlotSetupModule' },
      { path: 'servicePackage', loadChildren: 'app/components/servicePackage/servicePackage.module#ServicePackageModule' },
      { path: 'workshopPersonnel', loadChildren: 'app/components/workshopPersonnel/workshopPersonnel.module#WorkshopPersonnelModule' },
      { path: 'workBay', loadChildren: 'app/components/workBay/workBay.module#WorkBayModule' },
      //Warranty 
      { path: 'trSubmission', loadChildren: 'app/components/dTRSubmission/dTRSubmission.module#DTRSubmissionModule' },
      { path: 'trApproval', loadChildren: 'app/components/dTRApproval/dTRApproval.module#DTRApprovalModule' },
      { path: 'wcSubmission', loadChildren: 'app/components/wcSubmission/wcSubmission.module#WCSubmissionModule' },
      { path: 'wcProcessing', loadChildren: 'app/components/wcProcessing/wcProcessing.module#WCProcessingModule' },
      { path: 'wcValidation', loadChildren: 'app/components/wcValidation/wcValidation.module#WCvalidationModule' },
      //Frontline workshop
      { path: 'repairOrder', loadChildren: 'app/components/repairOrder/repairOrder.module#RepairOrderModule' },
      { path: 'repairOrder2', loadChildren: 'app/components/repairOrderv2/repairOrder2.module#RepairOrder2Module' },
      { path: 'appointment', loadChildren: 'app/components/appointment/appointment.module#AppointmentModule' },
      { path: 'invoice', loadChildren: 'app/components/invoice/invoice.module#InvoiceModule' },
      { path: 'jobFulfilment', loadChildren: 'app/components/jobFulfilment/jobFulfilment.module#JobFulfilmentModule' },
      { path: 'qualityControl', loadChildren: 'app/components/qualityControl/qualityControl.module#QuanlityControlModule' },
      { path: 'partFulfilment', loadChildren: 'app/components/partFulfilment/partFulfilment.module#PartFulfilmentModule' },
      { path: 'workShop', loadChildren: 'app/components/workShop/workShop.module#WorkShopModule' },
      { path: 'jPCB', loadChildren: 'app/components/jPCB/jPCB.module#JPCBModule' },
      //SPC
      { path: 'po', loadChildren: 'app/components/po/po.module#POModule' },
      { path: 'lpo', loadChildren: 'app/components/localPurchaseOrder/lpo.module#LPOModule' },
      { path: 'goodsReceiving', loadChildren: 'app/components/goodsReceiving/goodsReceiving.module#GoodsReceivingModule' },
      { path: 'stockAdjustment', loadChildren: 'app/components/stockAdjustment/stockAdjustment.module#StockAdjustmentModule' },
      { path: 'stockEnquiry', loadChildren: 'app/components/stockEnquiry/stockEnquiry.module#StockEnquiryModule' },
      
      
      //TODO: this one must be in the end registration routes
      { path: '**', loadChildren: 'app/components/error/error.module#ErrorModule' },
    ]
  }
];

export const ROUTES = RouterModule.forChild(routes);
