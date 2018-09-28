const Category = require('../models/categories');

exports.categoryId = (req, res) => {
    let name = req.params.name;

    Category.find({ parent: name }, function(err, subs) {
        let user = req.session.user;
        res.render('category', {
            user,
            subs,
            title:'Categories',
            description: 'User login area',
            error: 'Invalid Username'
        });
    });
};
