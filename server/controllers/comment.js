const Comment = require('../models/comment'),
    Accident = require('../models/accident'),
    config = require('../config/main'),
    AccidentController = require('./accident'),
    tools = require('../tools/tools');

exports.addNewCommentToAccident = function (req, res, next) {
    if (tools.isNullOrUndefined(req.params.id)) {
        res.status(400).json({
            message: 'Missing id'
        });
    }

    // Create the accident
    const comment = new Comment({
        name: req.body.name,
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