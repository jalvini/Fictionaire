const Story = require('../../models/stories');
const Authorized = require('../../models/authorized');

exports.auth = (req, res) => {
    const user = req.session.user;
    Story.find({author: user.name}, function(err, story){
        res.render('profile/authorize', {user, story});
    });
};

exports.authId = (req, res) => {
    const user = req.session.user;
    let id = req.params.id;
    Story.findOne({_id: id}, function(err, story){
        Authorized.find({storyId: id}, function(error, users){
            res.render('profile/authorize', {user, story, users, id});
        });
    });
};

exports.authPost = (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let user = req.session.user;
    const deleted= req.body.deleted;
    const save = req.body.save;


    //CHECK IF USER IS OWNER OF THE STORY
    Story.findOne({_id: id}, function (err, story) {
        if (story.author === user.name) {
            //ADD AND DELETE USER FROM AUTHORIZED USERS
            if(save){
                Authorized.create({storyId: id, owner: story.author, user: name});
            }
            else if(deleted){
                Authorized.remove({user:name }, function (err, result){
                });
            }
            res.redirect('back');
        }
        //IF USER IS NOT AUTHORIZED IT WILL KICK AN ERROR MESSAGE BACK
        else {
            Story.find({author: user.name}, function (err, story) {
                res.render('profile/authorize', {story, error: 'You Are Not Authorized To Add Users', user});
            });
        }
    });
};
