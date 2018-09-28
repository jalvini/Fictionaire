//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
        id: String,
        storyId: String,
        chapter:String,
        body:String},
    {collection: 'Chapters'}
);
let Chapter = mongoose.model('Chapter', ChapterSchema );

module.exports = Chapter;