const Story = require('../../models/stories');
const Category = require('../../models/categories');
const Authorized = require('../../models/authorized');

exports.write =  (req, res) => {
    let user = req.session.user;
    //IF USER IS LOGGED IN LET THEM WRITE THE STORY IF NOT THEY HAVE TO LOG IN
    if(req.session.user){
        Category.find(function(err, category) {
            res.render('story/write', {user, category, writing:true});
        });
    }
    else{
        res.redirect('/login');
    }
};

exports.writePost =  (req, res) => {
    let user = req.session.user;
    let title = req.sanitize(req.body.title);
    let body = req.sanitize(req.body.body);
    let tag = req.sanitize(req.body.tag);
    let author = req.session.user.name;
    let date = Date.now();
    // CHECK IF STORY IS A DRAFT OR PUBLISHED
    const publish = req.body.save;
    if(publish === 'draft'){
        let published = false;
        Story.create({title, body, author, date, published, tag});

        Category.find(function(err, category) {
            res.render('story/write', {user, category,draft:'Draft Saved', writing:true});
        });
    }
    else if(publish === 'save'){
        let published = true;
        Story.create({title, body, author, date, published, tag});

        Category.find(function(err, category) {
            res.render('story/write', {user, category, saved:'Story Published', writing:true});
        });
    }
};
