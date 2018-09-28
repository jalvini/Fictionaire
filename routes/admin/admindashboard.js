const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    console.log(req.session.user);
    let user = req.session.user;
    console.log(user);
    res.render('admin/admindashboard', {title: 'Best Site For Fan Fiction - Fictionaire.net', user});
});


module.exports = router;

/*
router.get('/', function(req, res) {
    if (req.session && req.session.user) { // Check if session exists
        // lookup the user in the DB by pulling their email from the session
        User.findOne({name: req.session.user.name}, function (err, user) {
            const admin = 'admin';
            if (!user) {
                // if the user isn't found in the DB, reset the session info and
                // redirect the user to the login page
                req.session.reset();
                res.redirect('/login');
            } else if(user.name === admin){
                // expose the user to the template
                res.locals.user = user;

                // render the dashboard page
                res.render('admin/admindashboard');
            }
            else{
                res.redirect('/dashboard');
            }
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
*/