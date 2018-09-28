//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        name: String,
        password:String,
        email: String,
        online: Boolean,
        pic: String,
        friends:Array},
    {collection: 'Users'}
);
let User = mongoose.model('User', UserSchema );

module.exports = User;