const express = require('express');
const {
  updateProfile,
  uploadImages,
  deleteImage,
  getDiscoverUsers,
  getUserById,
} = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.post('/images', protect, upload.array('images', 6), uploadImages);
router.delete('/images/:publicId', protect, deleteImage);
router.get('/discover', protect, getDiscoverUsers);
router.get('/:id', protect, getUserById);

module.exports = router;
