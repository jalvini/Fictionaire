const bcrypt = require('bcrypt');
const fs = require('fs');
const User = require('../models/users');

exports.register = (req, res) => {
    let user = req.session.user;

    if(user){
        res.redirect('/dashboard');
    }else {
        res.render('register', {title: 'Register For Fictionaire.Net'});
    }
};

exports.registerPost = (req, res) => {
    const inputName = req.sanitize(req.body.name.toLowerCase());
    const password = req.body.password;
    const inputEmail = req.sanitize(req.body.email);

    if(inputName !== undefined && password !== undefined && inputEmail !== undefined) {
        if (inputName.length >= 3 && password.length >= 5 && inputEmail.length > 5 && inputName.indexOf(' ') < 0) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                User.findOne({name: inputName}, function (err, name) {
                    User.findOne({email: inputEmail}, function (err, email) {
                        if (name == null && email == null) {
                            const dir = 'public/user/pics/' + inputName;
                            if (!fs.existsSync(dir)) {
                                fs.mkdirSync(dir);
                                fs.copyFile('public/user/pics/pic.jpg', dir + '/pic.jpg', (err) => {
                                    if (err) throw err;
                                    console.log('source.txt was copied to destination.txt');
                                });
                            }

                            User.create({
                                name: req.body.name,
                                password: hash,
                                email: req.body.email
                            }, function (err, user) {
                                res.render('register', {title: 'Congrats! You Have Registered', register: true});
                            });

                        }
                        else {
                            res.render('register', {title: 'Username Taken', error: 'Username or Email Already Taken'});
                        }
                    });
                });
            });
        }
        else{
            res.render('register', {title: 'Username Taken', error: 'Username, Email Or Password Invalid'});
        }
    }
    else{
        res.render('register', {title: 'Username Taken', error: 'Please Fill In All Fields'});
    }
};
