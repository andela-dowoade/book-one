/*User schema: Defines structure of users model*/
'use strict';
var mongoose = require('../config/db'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

var bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  published: {
    type: String
  },

  excerpt: String
});

bookSchema.plugin(autoIncrement.plugin, {
  model: 'Books',
  startAt: 1
});

// Disable auto indexing
bookSchema.set('autoIndex', false);
bookSchema.index({ name: 1, published: 1 });

module.exports = mongoose.model('Books', bookSchema);