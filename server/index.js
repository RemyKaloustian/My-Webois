// Importing Node modules and initializing Express
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  router = require('./router'),
  mongoose = require('mongoose'),
  mongo_express = require('mongo-express/lib/middleware'),
  mongo_express_config = require('./config/mongo_express'),
  config = require('./config/main');

// Database Setup
mongoose.Promise = Promise;

// Start the server
let server;
if (process.env.NODE_ENV != config.test_env) {
  mongoose.connect(config.databaseUrl + config.database, { useMongoClient: true });

  server = app.listen(config.port);
  console.log(`Your server is running on port ${config.port}.`);

  app.use('/mongo_express', mongo_express(mongo_express_config));
} else {
  mongoose.connect(config.databaseUrl + config.test_db, { useMongoClient: true });

  // Test env
  server = app.listen(config.test_port);
}


// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({
  extended: false
})); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/assets', express.static('assets'));

// Import routes to be served
router(app);

// necessary for testing
module.exports = server;
