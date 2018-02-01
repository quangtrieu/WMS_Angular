const siteController = require('../api/controllers/homePage');
const repairOrderController = require('../api/controllers/repairOrderController');
const jPCBController = require('../api/controllers/jPCBController');
const repairOrderPartController = require('../api/controllers/repairOrderPartController');
const invoiceController = require('../api/controllers/invoiceController');
const localPOController = require('../api/controllers/localPOController');

const passport = require('passport');
const requiredAuth = passport.authenticate('bearer', { session: false })

exports.initRoutes = function (app, express) {
  app.get('/', siteController.index);

  const apiRoutes = express.Router(),
    userRoutes = express.Router();

  var repairOrderRouter = express.Router();
  apiRoutes.use('/repairOrder', repairOrderRouter);
  repairOrderRouter.post('/getAll', repairOrderController.getAll);
  repairOrderRouter.get('/getAllPartType', repairOrderController.getAllPartType);
  repairOrderRouter.get('/getAllJobSource', repairOrderController.getAllJobSource);
  repairOrderRouter.get('/getAllPartSource', repairOrderController.getAllPartSource);
  repairOrderRouter.get('/getAllPaymentType', repairOrderController.getAllPaymentType);
  repairOrderRouter.get('/getAllComebackJob', repairOrderController.getAllComebackJob);
  repairOrderRouter.get('/getAllPDType', repairOrderController.getAllPDType);
  repairOrderRouter.post('/', repairOrderController.create);
  repairOrderRouter.put('/', repairOrderController.update);
  repairOrderRouter.get('/getById/:id', repairOrderController.getById);
  repairOrderRouter.get('/getFullRepairOrderById/:id', repairOrderController.getFullRepairOrderById);
  repairOrderRouter.delete('/:id', repairOrderController.delete);
  repairOrderRouter.post('/getByNo', repairOrderController.getByNo);
  repairOrderRouter.get('/getRepairOrderJobs/:id', repairOrderController.getRepairOrderJobs);
  repairOrderRouter.get('/getRepairOrderHistories/:vehicleCustomerId', repairOrderController.getRepairOrderHistories);
  

  var jPCBRouter = express.Router();
  apiRoutes.use('/jPCB', jPCBRouter);
  jPCBRouter.get('/getAllByDate/:date', jPCBController.getAllByDate);
  jPCBRouter.post('/createSuggestedBay', jPCBController.createSuggestedBay);

  var repairOrderPartRouter = express.Router();
  apiRoutes.use('/repairOrderPart', repairOrderPartRouter);
  repairOrderPartRouter.post('/getAll', repairOrderPartController.getAll);
  repairOrderPartRouter.get('/getByROId', repairOrderPartController.getByROId);

  var invoiceRouter = express.Router();
  apiRoutes.use('/invoice', invoiceRouter);
  invoiceRouter.post('/getAll', invoiceController.getAll);
  invoiceRouter.post('/getInvoiceById', invoiceController.getInvoiceById);
  invoiceRouter.post('/getROById', invoiceController.getROById);
  invoiceRouter.post('/', invoiceController.create);

  var localPORouter = express.Router();
  apiRoutes.use('/localPO', localPORouter);
  localPORouter.post('/getAll', localPOController.getAll);
  localPORouter.get('/getById/:id', localPOController.getById);
  localPORouter.get('/getPDData', localPOController.getPDData);
  localPORouter.get('/getROBySublet', localPOController.getROBySublet);
  localPORouter.post('/getAllSubletByPartJob', localPOController.getAllSubletByPartJob);
  localPORouter.post('/', localPOController.create);
  localPORouter.post('/filter', localPOController.filter);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};