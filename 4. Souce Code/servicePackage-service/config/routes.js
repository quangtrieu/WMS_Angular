
const siteController = require('../api/controllers/homePage');
const servicePackageController = require('../api/controllers/servicePackageController');

const passport = require('passport');
const requiredAuth = passport.authenticate('bearer', { session: false })

exports.initRoutes = function (app, express) {
  app.get('/', siteController.index);

  const apiRoutes = express.Router(),
    userRoutes = express.Router();

  var servicePackageRouter = express.Router();
  apiRoutes.use('/servicePackage', servicePackageRouter);

  servicePackageRouter.get('/getJobPartById/:id', servicePackageController.getJobPartById);
  servicePackageRouter.get('/getAllByVariantIdAndMilleage/:vehicleVariantId/:packageTypeId/:currentMilleage', servicePackageController.getAllByVariantIdAndMilleage);
  servicePackageRouter.get('/getAllPackageTypes', servicePackageController.getAllPackageTypes);
  servicePackageRouter.post('/upload', servicePackageController.upload);
  servicePackageRouter.post('/getAll', servicePackageController.getAll);
  servicePackageRouter.post('/download', servicePackageController.download);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};