const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// User Schema for login engine
//= ===============================

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);

