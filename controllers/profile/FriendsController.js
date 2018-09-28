const Friends = require('../../models/friends');
const User = require('../../models/users');
exports.friends =  (req, res) =>{
    let user = req.session.user;
    Friends.find({to:user.name}, function(err, request){
        let friendArr = [];
        for(let i = 0; i < request.length; i++){
            let requester = request[i].from;
            friendArr.push(requester);
        }
        User.find({name: {$in: friendArr}}, function(err, users){
            res.render('profile/friends', {users:users});
        });
    });
};
/*
MAKE SURE NOT TO FORGET TO ADD AN ARRAY TO USERS FOR FRIENDS
 */
exports.friendsPost =  (req, res) =>{
    let from = req.body.from;
    let user = req.session.user;
    let submit = req.body.save;
    if(submit === 'accept'){
        User.findOne({name:user.name}, function(err, user){
            //SAVE INPUT USER INTO AN FRIEND ARRAY;
            Friends.findOne({to: user.name, from: from}, function (err, results) {
                if(results === null){
                    res.render('profile/friends', {error: "Invalid Request"});
                }
                else {
                    let friendsArr = user.friends;
                    friendsArr.push(req.body.from);
                    User.updateOne({name: user.name}, {friends: friendsArr}, function (err, update) {
                        if (err) {
                            res.render('profile/friends', {error:err});
                        }
                    });
                    User.findOne({name: from}, function (err, friend) {
                        //SAVE ACTUAL USER INTO OTHERS FRIEND ARRAY;
                        let friendsArr = friend.friends;
                        friendsArr.push(user.name);
                        User.updateOne({name:friend.name},{friends:friendsArr} ,function(err, update){
                            if (err) {
                                res.render('profile/friends', {error:err});
                            }
                        });
                    });
                    Friends.deleteOne({to: user.name, from: from}, function(err, deleted){
                        if (err) {
                            res.render('profile/friends', {error:err});
                        }
                    });
                    res.render('profile/friends');
                }
            });
        });
    }
    else{

    }

};