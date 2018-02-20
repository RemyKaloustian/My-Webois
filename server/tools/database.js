const AccidentModel = require('../models/accident.model'),
    CommentModel = require('../models/comment.model'),
    UserModel = require('../models/user.model'),
    fs = require('fs');

const defaultAccidents = require('../default/accidents.json'),
    defaultUsers = require('../default/users.json');

exports.flushDatabaseAtStart = function () {
    AccidentModel.remove({}, function (err) {
        loadDefaultData('Accidents');
    });

    CommentModel.remove({});

    UserModel.remove({}).then(() => loadDefaultData('Users'));
};

loadDefaultData = function (data) {
    try {
        switch (data) {
            case 'Accidents':
                AccidentModel.insertMany(defaultAccidents);
                break;

            case 'Users':
                UserModel.insertMany(defaultUsers);
                break;

            default:
                break;
        }
    } catch (e) {
        console.log(e);
    }
};