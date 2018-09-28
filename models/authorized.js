//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const AuthorizedSchema = new Schema({
        storyId: ObjectId,
        owner: String,
        user:String
        },
    {collection: 'AuthorizedUsers'}
);
let Authorized = mongoose.model('Authorized', AuthorizedSchema );

module.exports = Authorized;