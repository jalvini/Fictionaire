let Story = require('../../models/stories');

exports.edit =  (req, res) => {
    let user = req.session.user;
    //IF USER EXISTS WITHIN THE SESSION
    if(user){
        let id = req.params.id;
        Story.findOne({_id: id}, function(err, story){
            const author = story.author;
            //IF USERNAME IS EQUAL TO AUTHOR NAME
            if(user.name === author)
                res.render('story/edit', {story: story, user:user ,title: 'Edit Profile', description: 'Edit your profile', writing:true});
            else{
                res.render('story/edit', {error:'You Are Not Authorized To Edit This Story', writing:true});
            }
        });
    }else {
        res.redirect('/login');
    }
};