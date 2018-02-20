const Accident = require('../models/accident.model'),
    config = require('../config/main.config'),
    tools = require('../tools/tools'),
    NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: 'AIzaSyA3uzHW5SYfkkpBPEguB7hJlTqCB9BUTas',
});

// TODO: Replace Maps ApiKey because Google does not work anymore for this key.

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
    if (!tools.isNullOrUndefined(req.query.longitude) &&
        !tools.isNullOrUndefined(req.query.latitude)) {
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

    // 10 kms radius
    var maxDistance = 10;

    // Convert distance by 110.57 (one degree is approximately 110.57 kilometers)
    // Thanks https://stackoverflow.com/questions/7837731/units-to-use-for-maxdistance-and-mongodb
    maxDistance /= 110.57;

    // get coordinates [ <long> , <lat> ]
    var coords = [];
    coords[0] = parseFloat(req.query.longitude);
    coords[1] = parseFloat(req.query.latitude);

    console.log(coords, maxDistance);

    // Find a location
    Accident.find({
        deleted: false,
        location: {
            $near: coords,
            $maxDistance: maxDistance
        }
    }).populate('comments').exec(function (err, accidents) {
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

            const seriousness = req.body.seriousness || 0,
                type = req.body.type || 0;

            if (seriousness >= config.accidentSeriousness.length) {
                return Promise.reject('Seriousness must be between 0 and ' + (config.accidentSeriousness.length - 1) + '.')
            } else if (type >= config.accidentType.length) {
                return Promise.reject('Type must be between 0 and ' + (config.accidentSeriousness.length - 1) + '.')
            }

            // Create the accident
            const accident = new Accident({
                location: [
                    g.longitude,
                    g.latitude
                ],
                address: g.formattedAddress,
                seriousness: seriousness,
                type: type
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

exports.updateRemovalCount = function (req, res, next) {
    if (tools.isNullOrUndefined(req.params.id)) {
        return res.status(400).json({
            message: 'Missing id.'
        });
    }

    Accident.findOneAndUpdate({
        _id: req.params.id
    }, {
        $inc: {
            askedRemove: 1
        }
    }, function (err, a) {
        if (err) {
            return res.status(500).json({
                message: 'Error while updating.'
            });
        }

        return res.status(200).json({
            message: 'Accident updated.'
        });
    });
}
