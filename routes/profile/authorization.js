const express = require('express');
const router = express.Router();

const AuthController = require('../../controllers/profile/AuthController');

router.get('/', AuthController.auth);

router.get('/:id', AuthController.authId);

router.post('/', AuthController.authPost);


module.exports = router;