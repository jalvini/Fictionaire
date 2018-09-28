const Messages = require('../models/messages');

exports.messagesRead = (req, res) =>{
    let user = req.session.user;
    Messages.find({sender:user.name}, (err, sent) => {
        Messages.find({receiver:user.name}, (err, received) => {
            res.render('messages', {sent, received, all:true, user});
        });
    });
};

exports.messageRead = (req, res) =>{
    let user = req.session.user;
    let message = req.params.id;
    Messages.findOne({_id:message}, (err, message) => {
        res.render('messages', {message, one:true, user});
    });
};

exports.messageSend = (req, res) =>{
    let user = req.session.user;
    res.render('messages', {send:true, user});
};

exports.messageReply = (req, res) =>{

};