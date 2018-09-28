const Users = require('../models/users');

exports.user = (req, res) => {
    const user = req.session.user;
    let perPage = 10
        , page = Math.max(0, req.param('page'))

    Users.find()
        .select('name')
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            name: 'asc'
        })
        .exec(function(err, users) {
            Users.count().exec(function(err, count) {
                res.render('users', {
                    users: users,
                    page: page,
                    pages: count / perPage,
                    user
                })
            })
        })


       };