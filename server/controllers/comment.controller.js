const Comment = require('../models/comment.model'),
    Accident = require('../models/accident.model'),
    config = require('../config/main.config'),
    AccidentController = require('./accident.controller'),
    tools = require('../tools/tools');

exports.addNewCommentToAccident = function (req, res, next) {
    if (tools.isNullOrUndefined(req.params.id)) {
        return res.status(400).json({
            message: 'Missing id.'
        });
    } else if (tools.isNullOrUndefined(req.body.comment)) {
        return res.status(400).json({
            message: 'Missing comment.'
        });
    }

    // Create the accident
    const comment = new Comment({
        name: req.body.name || 'User',
        comment: req.body.comment,
    });

    // Save it
    comment.save((err, c) => {
        if (err) {
            return res.status(404).json({
                message: 'Error'
            });
        }

        Accident.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                comments: comment
            }
        }, {
            upsert: true
        }, function (err, a) {
            if (err) {
                res.status(404).json({
                    message: 'Error while getting the accident'
                });
            }

            AccidentController.getOneAccidentById(req, res, next);
        });
    });
}
