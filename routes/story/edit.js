const express = require('express');
const router = express.Router();

const EditController = require('../../controllers/story/EditController');

//THIS RENDERS THE LOGIN PAGE FOR THE USER
router.get('/:id', EditController.edit);

module.exports = router;