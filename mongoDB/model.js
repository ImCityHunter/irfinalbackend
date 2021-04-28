const mongoose = require('mongoose');
const dishSchema = require('./schema.js');
const dishModel = mongoose.model('dishModel',dishSchema);
module.exports = dishModel;

