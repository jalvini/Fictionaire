const Story = require('../models/stories');

exports.tag = (req, res) => {
    let name = req.params.name;

    Story.find({ tag: name }, function(err, story) {
        let user = req.session.user;
        res.render('tag', {
            user,
            story,
            title:'Stories',
            description: 'User login area',
            error: 'Invalid Username'
        });
    });
};
