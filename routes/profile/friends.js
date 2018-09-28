const express = require('express');
const router = express.Router();
const FriendsController = require('../../controllers/profile/FriendsController');

//THIS RENDERS THE LOGIN PAGE FOR THE USER
router.get('/', FriendsController.friends);
router.post('/', FriendsController.friendsPost);


module.exports = router;