const tools = require('../config/main'),
  user = require('../models/user'),
  config = require('../config/main');

exports.login = function (req, res, next) {
  const params = req.params;

  if (!tools.isNullOrUndefined(params.username) &&
    !tools.isNullOrUndefined(params.password)) {
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
      return res.status(200).json(auth);
    }

    return res.status(404).json(auth);
  });
};

verifyCredentials = function (user1, user2) {
  if ((user1.username === user2.username) &&
        (user1.password() === user2.password())) {
    return true;
  }
  return false;
};

exports.register = function (req, res, next) {
  const params = req.params;

  return res.status(404);
};
