const mongoose = require('mongoose'),
  config = require('../config/main.config'),
  User = require('../models/user.model');

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

