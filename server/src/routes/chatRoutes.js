const express = require('express');
const { getChats, getMessages, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/', protect, getChats);
router.get('/:chatId/messages', protect, getMessages);
router.post('/:chatId/messages', protect, sendMessage);

module.exports = router;
