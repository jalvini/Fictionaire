//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
        to: String,
        from: String,
        status:Boolean},
    {collection: 'Friends'}
);
let Friend = mongoose.model('Friend', FriendSchema );

module.exports = Friend;