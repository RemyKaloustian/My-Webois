const mongoose = require('mongoose'),
  config = require('../config/main'),
  User = require('../models/authentications');

// Require the dev-dependencies
const chai = require('chai'),
  chaiHttp = require('chai-http'),
  index = require('../index'),
  should = chai.should();

chai.use(chaiHttp);

const server = null;

getApiPath = function () {
  return config.apiPath;
};

