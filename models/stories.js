//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const StorySchema = new Schema({
        title: String,
        body:String,
        author: String,
        date: Date,
        rating:Number,
        published:Boolean,
        tag:String},
    {collection: 'Stories'}
);
let Story = mongoose.model('Story', StorySchema );

module.exports = Story;