const fs = require('fs');
let User = require('../models/users');
let Story = require('../models/stories');
let Authorized = require('../models/authorized');
let Friends = require('../models/friends');

exports.dashboard = (req, res) => {
    let pic = fs.readdirSync('public/user/pics/joe/');

    if (req.session && req.session.user) { // Check if session exists
        // lookup the user in the DB by pulling their email from the session
        User.findOne({email: req.session.user.email}, function (err, user) {
            if (!user) {
                // if the user isn't found in the DB, reset the session info and
                // redirect the user to the login page
                req.session.reset();
                res.redirect('/login');
            } else {
                // expose the user to the template
                res.locals.user = user;

                //ARRAYS
                let array = [];
                let friendArr = user.friends;
                //FIND USER STORIES HERE
                Story.find({author: req.session.user.name}, function (err, story) {
                    //FIND STORY IDS FROM AUTH THAT USER IS AUTHORIZED TO VIEW
                    Authorized.find({user: req.session.user.name}, function (err, authStories) {
                        //THIS ADDS ALL THE AUTHORIZED STORY IDS TO AN ARRAY
                        for (let i = 0; i < authStories.length; i++) {
                            let ids = authStories[i].storyId;
                            array.push(ids);
                        }
                        // PULL AUTHORIZED STORIES BY ONCE AGAIN QUERYING MAIN STORY DB WITH AUTHORIZED ARRAY IDS
                        Story.find({_id: {$in: array}}, function (err, authStory) {
                            User.find({name: {$in: friendArr}}, function(err, friends){
                                res.render('dashboard', {
                                    user: user,
                                    story: story,
                                    title: 'Dashboard',
                                    stories: authStory,
                                    pic: pic[0],
                                   friends:friends,
                                });
                            });
                        });
                    });
                });
            }
        });
    } else {
        res.redirect('/login');
    }
};

exports.dashboardPost = (req, res) => {
    const inputId = req.body.storyId;
    let pic = fs.readdirSync('public/user/pics/joe/');

    Story.findById(inputId, function (err, story){
        let published = story.published;

        //THIS IS WHAT HAPPENS IF STORY IS PUBLISHED
        if(published === true){
            story.set({ published: false });
            story.save(function () {
                if (req.session && req.session.user) { // Check if session exists
                    // lookup the user in the DB by pulling their email from the session
                    User.findOne({email: req.session.user.email}, function (err, user) {
                        if (!user) {
                            // if the user isn't found in the DB, reset the session info and
                            // redirect the user to the login page
                            req.session.reset();
                            res.redirect('/login');
                        } else {
                            // expose the user to the template
                            res.locals.user = user;
                            let array = [];
                            //FIND USER STORIES HERE
                            Story.find({author: req.session.user.name}, function (err, story) {
                                //FIND STORY IDS FROM AUTH THAT USER IS AUTHORIZED TO VIEW
                                Authorized.find({user:req.session.user.name}, function(err, authStories){
                                    //THIS ADDS ALL THE AUTHORIZED STORY IDS TO AN ARRAY
                                    for(let i = 0; i < authStories.length; i++){
                                        let ids = authStories[i].storyId;
                                        array.push(ids);
                                    }
                                    // PULL AUTHORIZED STORIES BY ONCE AGAIN QUERYING MAIN STORY DB WITH AUTHORIZED ARRAY IDS
                                    Story.find({ _id: { $in : array } }, function(err, authStory){
                                        res.render('dashboard', {user:user, story:story, title:'Dashboard', stories:authStory, pic: pic[0]});
                                    });
                                });
                            });
                        }
                    });
                }
            });
        }
        //THIS IS WHAT HAPPENS IF STORY IS NOT PUBLISHED
        else if(published === false){
            story.set({ published: true });
            story.save(function () {
                if (req.session && req.session.user) { // CHECK SESSION
                    // LOOKUP USER BY PULLING THEIR SESSION EMAIL FROM THE DATABASE
                    User.findOne({email: req.session.user.email}, function (err, user) {
                        if (!user) {
                            // if the user isn't found in the DB, reset the session info and
                            // redirect the user to the login page
                            req.session.reset();
                            res.redirect('/login');
                        } else {
                            // EXPOSE USER TO TEMPLATE
                            res.locals.user = user;
                            let array = [];
                            //FIND USER STORIES HERE
                            Story.find({author: req.session.user.name}, function (err, story) {
                                //FIND STORY IDS FROM AUTH THAT USER IS AUTHORIZED TO VIEW
                                Authorized.find({user:req.session.user.name}, function(err, authStories){
                                    //THIS ADDS ALL THE AUTHORIZED STORY IDS TO AN ARRAY
                                    for(let i = 0; i < authStories.length; i++){
                                        let ids = authStories[i].storyId;
                                        array.push(ids);
                                    }
                                    // PULL AUTHORIZED STORIES BY ONCE AGAIN QUERYING MAIN STORY DB WITH AUTHORIZED ARRAY IDS
                                    Story.find({ _id: { $in : array } }, function(err, authStory){
                                        res.render('dashboard', {user:user, story:story, title:'Dashboard', stories:authStory, pic: pic[0]});
                                    });
                                });
                            });
                        }
                    });
                }
            });
        }
    })
};