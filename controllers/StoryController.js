let Story = require('../models/stories');
let Chapters = require('../models/chapters');

exports.storyId = (req, res) => {
    let id = req.params.id;
    Chapters.find({storyId: id }, function(err, chapters) {
        Story.findOne({_id: id}, function (err, story) {
            if (story != null) {
                let user = req.session.user;
                if (user !== undefined) {
                    let author = (req.session.user.name === story.author) ? true : null;

                    res.render('story/story', {
                        author,
                        user,
                        story,
                        chapters,
                        title: 'Stories',
                        description: 'This is the story page',
                        error: 'Invalid Story'
                    });
                }
                else {
                    res.render('story/story', {
                        user,
                        story,
                        title: 'Stories',
                        description: 'This is the story page',
                        error: 'Invalid Story'
                    });
                }
            }
            else {
                res.redirect('back');
            }
        });
    });
};