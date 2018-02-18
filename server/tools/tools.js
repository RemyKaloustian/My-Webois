exports.isNullOrUndefined = function (v) {
    return v === undefined ||  v === null || v === '' || v.length === 0;
}

exports.getRandomIntBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}