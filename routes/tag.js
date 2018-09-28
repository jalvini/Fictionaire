const express = require('express');
const router = express.Router();

const TagController = require('../controllers/TagController');

router.get('/:name', TagController.tag);

module.exports = router;