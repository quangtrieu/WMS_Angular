'use strict';

const bodyParser     = require('body-parser');
const db             = require('./api/entities');
const express        = require('express');
const passport       = require('passport');
const path           = require('path');
const routes         = require('./config/routes');
var morgan           = require('morgan');
var fs               = require('fs');
var rfs              = require('file-stream-rotator');
var redisClient      = require('./commons/redisCache');

// Express configuration
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// static resources for stylesheets, images, javascript files
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

routes.initRoutes(app, express);

//setting logger
var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory) // ensure log directory exists
var accessLogStream = rfs.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
app.use(morgan('combined', {stream: accessLogStream})) // setup the logger

//setting errorhandlers
// app.use(errorHandlers.notFound);
// app.use(errorHandlers.error);
// app.use(errorHandlers.errorDenied);

//just only run in the first time to mapping with database mysql
db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function () {
  // db.sequelize.sync({ force: false },{ logging: console.log }).then(function () {
        app.listen(5200);
        console.log('Server started on port 5200');
    // })
});
