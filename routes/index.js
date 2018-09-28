const express = require('express');
const router = express.Router();

    router.get('/', function(req, res) {
        let user = req.session.user;
        res.render('index', {title: 'Best Site For Fan Fiction - Fictionaire.net', user});
    });

module.exports = router;