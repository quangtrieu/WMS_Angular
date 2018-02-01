const siteController = require('../api/controllers/homePage');
const jobMasterController = require('../api/controllers/jobMasterController');
const jobGroupController = require('../api/controllers/jobGroupController');
const jobPartController = require('../api/controllers/jobPartController');
const jobFulfilmentController = require('../api/controllers/jobFulfilmentController');
const quantityController = require('../api/controllers/quantityController');

const passport = require('passport');
const requiredAuth = passport.authenticate('bearer', {
  session: false
})

exports.initRoutes = function (app, express) {
  app.get('/', siteController.index);

  const apiRoutes = express.Router(),
    userRoutes = express.Router();

  var jobMasterRouter = express.Router();
  apiRoutes.use('/jobMaster', jobMasterRouter);
  jobMasterRouter.post('/getAll', jobMasterController.getAll);
  jobMasterRouter.post('/', jobMasterController.create);
  jobMasterRouter.put('/', jobMasterController.update);
  jobMasterRouter.get('/getById/:id', jobMasterController.getById);
  jobMasterRouter.get('/getAllJobType', jobMasterController.getAllJobType);
  jobMasterRouter.get('/getListJobByJobGroupId/:jobGroupId/:vehicleVariantId', jobMasterController.getListJobByJobGroupId);
  jobMasterRouter.delete('/:id', jobMasterController.delete);

  var jobGroupRouter = express.Router();
  apiRoutes.use('/jobGroup', jobGroupRouter);
  jobGroupRouter.post('/getAll', jobGroupController.getAll);
  jobGroupRouter.post('/', jobGroupController.create);
  jobGroupRouter.put('/', jobGroupController.update);
  jobGroupRouter.get('/getById/:id', jobGroupController.getById);
  jobGroupRouter.delete('/:id', jobGroupController.delete);

  var jobPartRouter = express.Router();
  apiRoutes.use('/jobPart', jobPartRouter);
  jobPartRouter.post('/getAll', jobPartController.getAll);
  jobPartRouter.post('/getById', jobPartController.getById);
  jobPartRouter.post('/getByJobId', jobPartController.getByJobId);
  jobPartRouter.get('/getVehicleMake', jobPartController.getVehicleMake);
  jobPartRouter.post('/getVehicleModel', jobPartController.getVehicleModel);
  jobPartRouter.post('/getVehicleVariant', jobPartController.getVehicleVariant);
  jobPartRouter.get('/getVehicleModel', jobPartController.getAllVehicleModel);
  jobPartRouter.get('/getVehicleVariant', jobPartController.getAllVehicleVariant);
  jobPartRouter.get('/getJobMaster', jobPartController.getJobMaster);
  jobPartRouter.get('/getPartMaster', jobPartController.getPartMaster);
  jobPartRouter.get('/getByJobIdAndVariantId/:jobId/:vehicleVariantId', jobPartController.getByJobIdAndVariantId);
  jobPartRouter.get('/getLastestJobPartMasterId', jobPartController.getLastestJobPartMaster);
  jobPartRouter.put('/update', jobPartController.update);
  jobPartRouter.post('/', jobPartController.create);

  var jobFulfilmentRouter = express.Router();
  apiRoutes.use('/jobFulfilment', jobFulfilmentRouter);
  jobFulfilmentRouter.post('/getAll', jobFulfilmentController.getAll);
  jobFulfilmentRouter.get('/getById/:id', jobFulfilmentController.getById);
  jobFulfilmentRouter.put('/update', jobFulfilmentController.update);
  jobFulfilmentRouter.post('/getAssignTechnicians', jobFulfilmentController.getAssignTechnicians);
  jobFulfilmentRouter.post('/initJobFulfilment', jobFulfilmentController.initJobFulfilment);

  var quantityControlRouter = express.Router();
  apiRoutes.use('/quantity', quantityControlRouter);
  quantityControlRouter.post('/getAll', quantityController.getAll);
  quantityControlRouter.post('/getJobFF', quantityController.getJobFFItem);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};