const Accident = require('../models/accident'),
    config = require('../config/main'),
    tools = require('../tools/tools'),
    NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: 'AIzaSyA3uzHW5SYfkkpBPEguB7hJlTqCB9BUTas',
});

exports.getOneAccidentById = function (req, res, next) {
    if (tools.isNullOrUndefined(req.params.id)) {
        return res.status(400).json({
            message: 'Missing id.'
        });
    }

    Accident.findOne({
            _id: req.params.id,
            deleted: false
        })
        .populate('comments')
        .exec(function (err, a) {
            if (err || !a) {
                return res.status(404).json({
                    message: 'Can\'t find the accident.'
                });
            }

            res.status(200).json(a);
        });
}

exports.getAllAccidents = function (req, res, next) {
    // If we want the nearest 
    if (req.query.longitude !== undefined &&
        req.query.longitude !== null &&
        req.query.latitude !== undefined &&
        req.query.latitude !== null) {
        return getNearestAccident(req, res, next);
    }

    // Else, find all accidents
    Accident.find({
        deleted: false
    }).populate('comments').exec(function (err, accidents) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(accidents);
    });
}

/**
 * Get nearest accident from { latitude, longitude }
 * 
 * Special thanks to Robert Onodi, http://blog.robertonodi.me/how-to-use-geospatial-indexing-in-mongodb-using-express-and-mongoose/
 */
getNearestAccident = function (req, res, next) {
    // console.log('--- GET NEAREST ---');

    // 2 kms radius
    var maxDistance = 200;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <lat> , <lng> ]
    var coords = [];
    coords[0] = parseFloat(req.query.longitude);
    coords[1] = parseFloat(req.query.latitude);

    // console.log(coords);

    // Find a location
    Accident.find({
        deleted: false,
        location: {
            $near: coords,
            $maxDistance: maxDistance
        }
    }).exec(function (err, accidents) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(accidents);
    });
}

exports.addNewAccident = function (req, res, next) {
    if (tools.isNullOrUndefined(req.body.latitude) ||
        tools.isNullOrUndefined(req.body.longitude)) {
        return res.status(400).json({
            message: 'Missing latitude and/or longitude'
        });
    }

    geocoder.geocode(req.body.latitude + ',' + req.body.longitude)
        .then(function (geo) {
            if (tools.isNullOrUndefined(geo)) {
                return Promise.reject('Google Maps error');
            }

            const g = geo[0];

            // Create the accident
            const accident = new Accident({
                location: [
                    g.longitude,
                    g.latitude
                ],
                address: g.formattedAddress,
            });

            // Save it
            accident.save((err, a) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal error.'
                    });
                }

                res.status(200).json(a);
            });
        })
        .catch(function (err) {
            return res.status(500).json({
                message: 'An error occured',
                error: err,
            });
        });
}

exports.deleteAccident = function (req, res, next) {
    if (tools.isNullOrUndefined(req.params.id)) {
        return res.status(400).json({
            message: 'Missing id.'
        });
    }

    Accident.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: {
            deleted: true
        }
    }, {
        upsert: true
    }, function (err, a) {
        if (err) {
            return res.status(500).json({
                message: 'Error while updating.'
            });
        }

        return res.status(200).json({
            message: 'Accident deleted successfully.'
        });
    });
}