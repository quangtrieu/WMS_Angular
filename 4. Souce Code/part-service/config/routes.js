
const siteController = require('../api/controllers/homePage');
const partMasterController = require('../api/controllers/partMasterController');
const partPriceController = require('../api/controllers/partPriceController');
const goodsReceivingController = require('../api/controllers/goodsReceivingController');
const partFulfillmentController = require('../api/controllers/partFulfillmentController');

const passport = require('passport');
const requiredAuth = passport.authenticate('bearer', { session: false })

exports.initRoutes = function (app, express) {
  app.get('/', siteController.index);

  const apiRoutes = express.Router(),
    userRoutes = express.Router();

  var partMasterRouter = express.Router();
  apiRoutes.use('/partMaster', partMasterRouter);
  partMasterRouter.post('/getall', partMasterController.getall);
  partMasterRouter.post('/', partMasterController.createPartMaster);
  partMasterRouter.put('/', partMasterController.updatePartMaster);
  partMasterRouter.get('/getById/:id', partMasterController.getById);
  partMasterRouter.get('/getListPartByWorkShopId/:workShopId/:vehicleVariantId', partMasterController.getListPartByWorkShopId);
  partMasterRouter.delete('/:id', partMasterController.deletePartMaster);
  partMasterRouter.post('/getPartSubstitute', partMasterController.getPartSubstitute);

  var partPriceRouter = express.Router();
  apiRoutes.use('/partPrice', partPriceRouter);
  partPriceRouter.post('/getPaging', partPriceController.getPaging);
  partPriceRouter.post('/', partPriceController.createPartPrice);
  partPriceRouter.put('/', partPriceController.updatePartPrice);
  partPriceRouter.get('/getById/:id', partPriceController.getById);
  partPriceRouter.delete('/:id', partPriceController.deletePartPrice);

  var partFulfillmentRouter = express.Router();
  apiRoutes.use('/fulfillment', partFulfillmentRouter);
  partFulfillmentRouter.post('/getFulfillment', partFulfillmentController.getFulfillment);
  partFulfillmentRouter.post('/', partFulfillmentController.create);
  partFulfillmentRouter.get('/confirmPicking', partFulfillmentController.confirmPicking);

  var goodsReceivingRouter = express.Router();
  apiRoutes.use('/goodsReceiving', goodsReceivingRouter);
  goodsReceivingRouter.post('/getListPartByWorkShopId', goodsReceivingController.getListPartByWorkShopId);
  goodsReceivingRouter.post('/getListBinByWorkShopId', goodsReceivingController.getListBinByWorkShopId);
  goodsReceivingRouter.post('/', goodsReceivingController.create);
  goodsReceivingRouter.post('/getAll', goodsReceivingController.getAll);
  goodsReceivingRouter.post('/upload', goodsReceivingController.upload);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};