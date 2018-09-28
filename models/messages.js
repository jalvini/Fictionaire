//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
        date: Date,
        title: String,
        body:String,
        sender: String,
        receiver:String,
        OriginMessage:String,
        receiverRead:Boolean,
        senderDelete:Boolean,
        receiverDelete:Boolean
    },
    {collection: 'Messages'}
);
let Message = mongoose.model('Message', MessageSchema);

module.exports = Message;