const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

router.get('/', RegisterController.register);

router.post('/', RegisterController.registerPost);

module.exports = router;