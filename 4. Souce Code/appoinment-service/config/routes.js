const appointmentController = require('../api/controllers/appointmentController');

const passport = require('passport');
const requiredAuth = passport.authenticate('bearer', {
  session: false
})

exports.initRoutes = function (app, express) {
  const apiRoutes = express.Router();

  var appointmentRouter = express.Router();
  apiRoutes.use('/appointment', appointmentRouter);
  appointmentRouter.post('/getAll', appointmentController.getAll);
  appointmentRouter.get('/getById/:id', appointmentController.getById);
  appointmentRouter.post('/', appointmentController.create);
  appointmentRouter.put('/', appointmentController.update);
  appointmentRouter.delete('/:id', appointmentController.delete);
  appointmentRouter.post('/getTimeSlotDetailUses', appointmentController.getTimeSlotDetailUses);
  appointmentRouter.post('/getByNo', appointmentController.getByNo);
  appointmentRouter.post('/getByTimeSlot', appointmentController.getByTimeSlot);
  appointmentRouter.get('/getAllAppointmentByRegistrationNo/:workShopId/:registrationNo', appointmentController.getAllAppointmentByRegistrationNo);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};