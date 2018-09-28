const express = require('express');
const router = express.Router();
const EditController = require('../../controllers/profile/EditController');

//THIS RENDERS THE LOGIN PAGE FOR THE USER
router.get('/', EditController.editProfile);

router.post('/', EditController.editProfilePost);

module.exports = router;