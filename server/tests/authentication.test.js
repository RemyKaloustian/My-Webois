const mongoose = require('mongoose'),
  config = require('../config/main.config'),
  User = require('../models/user.model');

// Require the dev-dependencies
const chai = require('chai'),
  chaiHttp = require('chai-http'),
  index = require('../index'),
  should = chai.should();

chai.use(chaiHttp);

let server = null;

const u = {
    username: 'userTest',
    password: 'whatever'
};

getApiPath = function () {
  return config.apiPath;
};

describe('Authentication', () => {
  /* TEST CONTEXT MANAGEMENT */
  before((done) => {
    server = chai.request(index);
    // Emptying DB for collision avoidance
    User.remove({}).then(() => done());
  });

  // Emptying DB once done
  after((done) => {
    User.remove({}).then(() => done());
  });

  /* REAL TESTING */
  describe('Register and login', () => {

    it('Registering userTest', (done) => {
      server.post(getApiPath() + '/auth/register')
          .send(u)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('username').eql(u.username);
            res.body.should.have.property('password').eql(u.password);
            res.body.should.have.property('_id');
            done();
          });
    });


  });
});
