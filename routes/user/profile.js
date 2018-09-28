const express = require('express');
const router = express.Router();

const ProfileController = require('../../controllers/user/ProfileController');

router.get('/:name', ProfileController.profile);

module.exports = router;