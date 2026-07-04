const express = require('express');
const { likeUser, dislikeUser, getMatches, unmatch } = require('../controllers/matchController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/like/:userId', protect, likeUser);
router.post('/dislike/:userId', protect, dislikeUser);
router.get('/', protect, getMatches);
router.delete('/:userId', protect, unmatch);

module.exports = router;
