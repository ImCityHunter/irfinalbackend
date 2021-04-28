const mongoose = require('mongoose');
const dishSchema = new mongoose.Schema({
    title: {type:String, required:true},
    instruction: String,
    ingredients: String,
    _id: {type:Number, required:true}
}, {collection:'dish-collections'})

module.exports = dishSchema;