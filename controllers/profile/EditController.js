const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('../../models/users');

exports.editProfile = (req, res) => {
    let user = req.session.user;
    const edit = true;
    if(user){
        User.findOne({email: req.session.user.email}, function(err, user){
            res.render('profile/edit', {user: user, title: 'Edit Profile', description: 'Edit your profile', edit:edit, layout: null});
        });
    }else {
        res.redirect('login');
    }
};

exports.editProfilePost = (req, res) => {
    let image = req.body.imageUpload.replace(/^data:image\/png;base64,/, "");
    let user = req.session.user;
    const password = req.body.password;
    const edit = true;

    //THIS UPDATES THE USERS PASSWORD
    if(password.length != null){
        if(password.length >= 5){
            const passRepeat = req.body.repeatPassword;
            if(password === passRepeat){
                bcrypt.hash(password, 10, function(err, hash) {
                    User.updateOne({name:user.name}, { $set: { password: hash }}, callback);
                    function callback (err) {
                        if(err){
                            return res.status(500).send(err);
                        }
                    }
                });
            }
        }
    }

    //THIS CHECKS THE FILE FILE NAME AND SETS THE USERS PICTURE
    if(image !== undefined){
        const dir = 'public/user/pics/' + req.session.user.name;
        let fileName = dir +'/pic.jpg';
        fs.writeFile(fileName, image, 'base64', function (err) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }
        });
    }
    //THIS RENDERS THE PAGE IF USER IS LOGGED IN
    if(user){
        User.findOne({email: user.email}, function(err, user){
            res.render('profile/edit', {user: user, title: 'Edit Profile', description: 'Edit your profile',edit:edit});
        });
    }else {
        res.redirect('login');
    }

};
