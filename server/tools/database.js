const AccidentModel = require('../models/accident.model'),
    CommentModel = require('../models/comment.model'),
    UserModel = require('../models/user.model'),
    fs = require('fs');

exports.flushDatabaseAtStart = function () {
    AccidentModel.remove({});

    CommentModel.remove({});

    UserModel.remove({});
};