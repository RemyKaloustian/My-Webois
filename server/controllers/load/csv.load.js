const Accident = require('../../models/accident.model'),
    config = require('../../config/main'),
    csv = require('csv-stream'),
    request = require('request'),
    tools = require('../../tools/tools'),
    NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: 'AIzaSyA3uzHW5SYfkkpBPEguB7hJlTqCB9BUTas',
});

isLatOrLongCorrect = function (lat, lng) {
    return !tools.isNullOrUndefined(lat) &&
        !tools.isNullOrUndefined(lng) &&
        '' + lat !== '0' &&
        '' + lng !== '0';
}

isAddressCorrect = function (num, voie, cp) {
    return !tools.isNullOrUndefined(voie) &&
        !tools.isNullOrUndefined(cp);
}

getLatitude = function (lat) {
    // Trick the lat/lng
    return parseFloat(lat) / Math.pow(10, lat.length - 2);
}

getLongitude = function (lng) {
    // Trick the lat/lng
    return parseFloat(lng) / Math.pow(10, lng.length - 1);
}

getLocationObject = function (object) {
    let r = '';

    if (isLatOrLongCorrect(object.lat, object.long) &&
        isAddressCorrect(object.numero, object.libellevoie, object.codeinsee)) {

        const lat = getLatitude(object.lat),
            lng = getLongitude(object.long);

        return Promise.resolve([{
            latitude: lat,
            longitude: lng,
            formattedAddress: object.numero + ' ' + object.libellevoie + ' ' + object.codeinsee
        }]);

    } else if (isLatOrLongCorrect(object.lat, object.long)) {

        const lat = getLatitude(object.lat),
            lng = getLongitude(object.long);

        r += lat + ',' + lng;

    } else if (isAddressCorrect(object.numero, object.libellevoie, object.codeinsee)) {

        r += object.numero + ' ' + object.libellevoie + ' ' + object.codeinsee;

    } else {

        return Promise.reject('not enough data');

    }

    return geocoder.geocode(r);
}

exports.loadCsvFileFromGovAndSave = function (req, res, next) {
    const csvStream = csv.createStream({
        delimiter: ';', // default is ,
    });

    // Little fix for Node8
    csvStream._encoding = 'utf8';

    // Get the file
    request(req.body.filePath)
        // Parse the CSV
        .pipe(csvStream)
        .on('error', function (err) {
            res.status(404).json({
                message: 'Could not parse the CSV.'
            });
        })
        .on('data', function (data) {
            getLocationObject(data)
                .then(function (geo) {
                    let g = geo[0];

                    if (tools.isNullOrUndefined(g)) {
                        return Promise.reject('Google getting info error');
                    }

                    const seriousness = tools.getRandomIntBetween(0, config.accidentSeriousness.length - 1),
                        type = tools.getRandomIntBetween(0, config.accidentType.length - 1);

                    // Create the accident
                    const accident = new Accident({
                        location: [
                            g.longitude,
                            g.latitude,
                        ],
                        address: g.formattedAddress,
                        seriousness: seriousness,
                        type: type
                    });

                    // Save it
                    accident.save((err, a) => {
                        if (err) {
                            return;
                        }

                        console.log('Accident added: ', a);
                        console.log('-----');
                        console.log('-----');
                    });
                })
                .catch(function (err) {
                    console.log(err + '--- going to next;')
                });
        });

    res.status(200).json({
        message: 'CSV will be parsed!'
    });
}