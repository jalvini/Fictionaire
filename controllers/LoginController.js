const bCrypt = require('bcrypt');
const User = require('../models/users');

exports.login = (req, res) => {
    let user = req.session.user;
    if(user){
        res.redirect('dashboard');
    }else {
        res.render('login', {title: 'Login', description: 'User login area'});
    }
};

exports.loginPost = (req, res) => {
    const username = req.sanitize(req.body.name);
    User.findOne({ name: username }, function(err, user) {
        // ADDED THIS USER != NULL BECAUSE RIGHT BELOW IT BCRYPT FAILS WITHOUT A USER AND SPITS AN ERROR BACK AT ME
        if (user != null){
            bCrypt.compare(req.body.password, user.password, function (err, check) {
                const admin = 'admin';
                // IF USER IS NOT FOUND IN THE DATABASE
                if (!user) {
                    res.render('login', {
                        title: 'Login',
                        description: 'User login area',
                        error: 'Invalid Username'});
                } else {
                    if (check === true && user.name === admin) {
                        res.redirect('/admindashboard');
                    }
                    else if (check === true) {
                        User.updateOne({name:user.name}, { $set: { online: true }}, callback);
                        function callback (err) {
                            if(err){
                                return res.status(500).send(err);
                            }
                        }
                        req.session.user = user;
                        res.redirect('/dashboard');
                    }
                    else {
                        res.render('login', {
                            title: 'Login',
                            description: 'User login area',
                            error: 'Invalid Password.'
                        });
                    }
                }
            });
        }
        else{
            res.render('login', {
                title: 'Login',
                description: 'User login area',
                error: 'Please Enter a Username.'
            });
        }
    });
};
