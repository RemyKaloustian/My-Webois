// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Accident Schema
//= ===============================

// Special thanks to Robert Onodi, http://blog.robertonodi.me/how-to-use-geospatial-indexing-in-mongodb-using-express-and-mongoose/

const AccidentSchema = new Schema({
  location: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2d' // create the geospatial index
  },
  address: {
    type: String
  },
  seriousness: {
    type: String
  },
  type: {
    type: String
  },
  number: {
    type: String
  },
  description: { 
    type: String
  },
  askedRemove: { 
    type: Number,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// localization (GPS coordinates, latitude and longitude, and place-name), seriousness of the accident, number of accidents at a location. Not all this information is in the given data; you may need an api to get place-name from latitude/longitude and vice-versa.

module.exports = mongoose.model('Accident', AccidentSchema);