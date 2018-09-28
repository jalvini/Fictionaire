const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/MessageController');

router.get('/', MessageController.messagesRead);

router.get('/send', MessageController.messageSend);

router.get('/:id', MessageController.messageRead);

router.post('/', MessageController.messageSend);

router.post('/:id', MessageController.messageReply);


module.exports = router;