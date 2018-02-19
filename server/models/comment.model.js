// Importing Node packages required for schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//= ===============================
// Comment Schema
//= ===============================
const CommentSchema = new Schema({
  name: { type: String },
  comment: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);
