const express = require('express');
const router = express.Router();

const WriteController = require('../../controllers/story/WriteController');

router.get('/', WriteController.write);

router.post('/', WriteController.writePost);

/*
MAKE SURE TO GET RID OF AUTHORIZATIONS IF STORY IS DELETED.
SO IF A USER DELETES A STORY MAKE SURE THAT THAT THE USERS
AUTHORIZATIONS ARE DELETED TOO.
 */

module.exports = router;