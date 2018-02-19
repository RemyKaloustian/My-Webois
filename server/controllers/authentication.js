const tools = require('../tools/tools'),
  User = require('../models/authentications'),
  config = require('../config/main');

exports.login = function (req, res, next) {
  const params = req.body;

  console.log(params);

  if (tools.isNullOrUndefined(params.username) ||
    tools.isNullOrUndefined(params.password)) {
    return res.status(400).json({
      message: 'Malformed login credentials.'
    });
  }

  User.findOne({
    username: params.username,
    password: params.password
  })
  .exec((err, credentials) => {
    if (err) {
      return res.status(404).json({
        message: 'Error while fetching user data.'
      });
    }
    const auth = verifyCredentials(params, credentials);
    if (auth) {
      return res.status(200).json({
        success: auth,
        message: 'Login successful.'
      });
    }

    return res.status(404).json({
      success: auth,
      message: 'Login failed.'
    });
  });
};

verifyCredentials = function (user1, user2) {
  if ((user1.username === user2.username) &&
        (user1.password === user2.password)) {
    return true;
  }
  return false;
};

exports.register = function (req, res, next) {
  const params = req.body;

  console.log(params);

  if (tools.isNullOrUndefined(params.username) ||
  tools.isNullOrUndefined(params.password)) {
    return res.status(400).json({
      message: 'Malformed credentials'
    });
  }

  const newUser = new User();
  newUser.username = params.username;
  newUser.password = params.password;

  newUser.save((err, u) => {
    if (err) {
      return res.status(403).json({
        message: 'User registral rejected.'
      });
    }

    res.status(200).json(u);
  });


  return res.status(404);
};
