//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
        id: String,
        name: String,
        parent:String,
        url:String},
    {collection: 'Categories'}
);
let Category = mongoose.model('Category', CategorySchema );

module.exports = Category;