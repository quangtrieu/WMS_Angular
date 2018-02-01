
const siteController = require('../api/controllers/homePage');
const userController = require('../api/controllers/userController');
const vehicleMakeController = require('../api/controllers/vehicleMakeController');
const customerController = require('../api/controllers/customerController');
const vehicleController = require('../api/controllers/vehicleController');
const vehicleCustomerController = require('../api/controllers/vehicleCustomerController');
const vehicleModelController = require('../api/controllers/vehicleModelController');
const vehicleVariantController = require('../api/controllers/vehicleVariantController');
const timeSlotController = require('../api/controllers/timeSlotController');
const serviceAdvisorController = require('../api/controllers/serviceAdvisorController');
const workBayController = require('../api/controllers/workBayController');
const workPersonnelController = require('../api/controllers/workPersonnelController');
const quantityControlController = require('../api/controllers/quantityControlController');
const workShopController = require('../api/controllers/workShopController');

const passport = require('passport');
const requiredAuth = passport.authenticate('bearer', { session: false })

exports.initRoutes = function (app, express) {
  app.get('/', siteController.index);

  const apiRoutes = express.Router(),
    userRoutes = express.Router();

  apiRoutes.use('/user', userRoutes)
  userRoutes.get('/getById/:id', userController.getById);

  var vehileMakeRouter = express.Router();
  apiRoutes.use('/vehicleMake', vehileMakeRouter);
  vehileMakeRouter.post('/getAll', vehicleMakeController.getAll);
  vehileMakeRouter.get('/getById/:id', vehicleMakeController.getById);
  vehileMakeRouter.post('/', vehicleMakeController.create);
  vehileMakeRouter.put('/', vehicleMakeController.update);
  vehileMakeRouter.post('/checkExistCode', vehicleMakeController.checkExistCode);
  vehileMakeRouter.post('/filter', vehicleMakeController.filter);

  var customerRouter = express.Router();
  apiRoutes.use('/customer', customerRouter);
  customerRouter.post('/getAll', customerController.getAll);
  customerRouter.post('/', customerController.create);
  customerRouter.put('/', customerController.update);
  customerRouter.get('/getById/:id', customerController.getById);
  customerRouter.delete('/:id', customerController.delete);
  customerRouter.post('/checkExistCode', customerController.getByCode);
  customerRouter.get('/getPDData', customerController.getAllPDData);

  var vehicleCustomerRouter = express.Router();
  apiRoutes.use('/vehicleCustomer', vehicleCustomerRouter);
  vehicleCustomerRouter.post('/', vehicleCustomerController.create);
  vehicleCustomerRouter.put('/', vehicleCustomerController.update);
  vehicleCustomerRouter.get('/getByVehicle/:id', vehicleCustomerController.getByVehicle);
  vehicleCustomerRouter.get('/getVehicleByRegistrationNo/:registrationNo', vehicleCustomerController.getVehicleByRegistrationNo);
  vehicleCustomerRouter.delete('/:id', vehicleCustomerController.delete);
  vehicleCustomerRouter.post('/getByNo', vehicleCustomerController.getByNo);
  vehicleCustomerRouter.post('/checkRegistrationNo', vehicleCustomerController.checkExistRegistrationNo);

  var vehicleRouter = express.Router();
  apiRoutes.use('/vehicle', vehicleRouter);
  vehicleRouter.post('/getAll', vehicleController.getAll);
  vehicleRouter.post('/', vehicleController.create);
  vehicleRouter.put('/', vehicleController.update);
  vehicleRouter.get('/getById/:id', vehicleController.getById);
  vehicleRouter.delete('/:id', vehicleController.delete);
  vehicleRouter.post('/getByNo', vehicleController.getByNo);
  vehicleRouter.get('/getByVehicleCustomerId/:id', vehicleController.getByVehicleCustomerId);
  vehicleRouter.post('/checkVinNo', vehicleController.getByVinNo);
  vehicleRouter.get('/checkExistChassisNo/:chassisNo', vehicleController.checkExistChassisNo);
  vehicleRouter.get('/getVehicleByChassisNo/:chassisNo', vehicleController.getVehicleByChassisNo);

  var vehicleModelRouter = express.Router();
  apiRoutes.use('/vehicleModel', vehicleModelRouter);
  vehicleModelRouter.post('/getAll', vehicleModelController.getAll);
  vehicleModelRouter.post('/', vehicleModelController.create);
  vehicleModelRouter.put('/', vehicleModelController.update);
  vehicleModelRouter.get('/getById/:id', vehicleModelController.getById);
  vehicleModelRouter.delete('/:id', vehicleModelController.delete); 
  vehicleModelRouter.get('/getByVehicleMakeId/:id', vehicleModelController.getByVehicleMakeId);
  vehicleModelRouter.post('/checkExistCode', vehicleModelController.checkExistCode);
  vehicleModelRouter.post('/filter', vehicleModelController.filter);

  var vehicleVariantRouter = express.Router();
  apiRoutes.use('/vehicleVariant', vehicleVariantRouter);
  vehicleVariantRouter.post('/getAll', vehicleVariantController.getAll);
  vehicleVariantRouter.post('/', vehicleVariantController.create);
  vehicleVariantRouter.put('/', vehicleVariantController.update);
  vehicleVariantRouter.get('/getById/:id', vehicleVariantController.getById);
  vehicleVariantRouter.delete('/:id', vehicleVariantController.delete);
  vehicleVariantRouter.get('/getByVehicleId/:id', vehicleVariantController.getByVehicleId);
  vehicleVariantRouter.get('/getByVehicleModelId/:id', vehicleVariantController.getByVehicleModelId);
  vehicleVariantRouter.post('/checkExistCode', vehicleVariantController.checkExistCode);
  vehicleVariantRouter.post('/filter', vehicleVariantController.filter);

  var timeSlotRouter = express.Router();
  apiRoutes.use('/timeSlot', timeSlotRouter);
  timeSlotRouter.get('/getTimeSlots/:workShopId', timeSlotController.getTimeSlots);
  timeSlotRouter.get('/getByTimeSlotUseId/:id', timeSlotController.getByTimeSlotUseId);
  timeSlotRouter.get('/getTimeSlotDetailById/:id', timeSlotController.getTimeSlotDetailById);
  timeSlotRouter.post('/getTimeStart', timeSlotController.getTimeStart);
  timeSlotRouter.post('/getTimeSlotSpecialDay', timeSlotController.getAllTimeSlotSpecialDay);
  timeSlotRouter.post('/', timeSlotController.createTimeSlotSpecialDay);
  timeSlotRouter.get('/getTimeSlotMaster', timeSlotController.findTimeSlotMaster);
  timeSlotRouter.put('/', timeSlotController.updateTimeSlot);
  timeSlotRouter.put('/timeSlotDetail', timeSlotController.updateTimeSlotDetail);
  timeSlotRouter.post('/getTimeSlotSpecialDaysByDateRange', timeSlotController.getTimeSlotSpecialDaysByDateRange);
  timeSlotRouter.post('/getTimeSlotByDate', timeSlotController.getTimeSlotByDate);

  var serviceAdvisorRouter = express.Router();
  apiRoutes.use('/serviceAdvisor', serviceAdvisorRouter);
  serviceAdvisorRouter.post('/getAll', serviceAdvisorController.getAll);
  serviceAdvisorRouter.post('/', serviceAdvisorController.create);
  serviceAdvisorRouter.put('/', serviceAdvisorController.update);
  serviceAdvisorRouter.get('/getById/:id', serviceAdvisorController.getById);

  var workBayRouter = express.Router();
  apiRoutes.use('/workBay', workBayRouter);
  workBayRouter.post('/getAll', workBayController.getAll);
  workBayRouter.get('/getById/:id', workBayController.getById);
  workBayRouter.get('/getHoist', workBayController.getHoist);
  workBayRouter.get('/getBayType', workBayController.getBayType);
  workBayRouter.get('/getEmployee', workBayController.getEmployee);
  workBayRouter.post('/', workBayController.create);
  workBayRouter.put('/', workBayController.update);

  var workPersonnelRouter = express.Router();
  apiRoutes.use('/workPersonnel', workPersonnelRouter);
  workPersonnelRouter.post('/getAll', workPersonnelController.getAll);
  workPersonnelRouter.get('/getById/:id', workPersonnelController.getById);
  workPersonnelRouter.get('/getRole', workPersonnelController.getRole);
  workPersonnelRouter.put('/update', workPersonnelController.updateWorkShopPersonnel);
  workPersonnelRouter.post('/', workPersonnelController.create);

  var quantityControlRouter = express.Router();
  apiRoutes.use('/quantity', quantityControlRouter);
  quantityControlRouter.get('/getInspectionCheckList', quantityControlController.getInspectionCheckList);
  quantityControlRouter.get('/getPDInspectionValue', quantityControlController.getPDInspectionValue);
  quantityControlRouter.post('/create', quantityControlController.create);
  quantityControlRouter.get('/findInspectionCheckList', quantityControlController.findInspectionCheckList);
  quantityControlRouter.post('/chkExistInspectionQC', quantityControlController.chkExistInspectionQC);
  quantityControlRouter.post('/updateJobFF', quantityControlController.updateJobFFItem);

  var workShopRouter = express.Router();
  apiRoutes.use('/workShop', workShopRouter);
  workShopRouter.post('/getAll', workShopController.getAll);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};