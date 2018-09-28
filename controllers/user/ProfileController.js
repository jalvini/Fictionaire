const User  = require('../../models/users');
exports.profile = (req, res) => {
    let  name = req.params.name;
    User.findOne({name: name},(err, user) => {
        res.render('user/profile', {user:user});
    });
};