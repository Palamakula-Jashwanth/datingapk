const express = require('express');
const { body } = require('express-validator');
const { register, login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('age').isInt({ min: 18 }).withMessage('You must be at least 18 years old'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    body('interestedIn').isIn(['male', 'female', 'both']).withMessage('Invalid preference'),
    body('location').trim().notEmpty().withMessage('Location is required'),
  ],
  register
);

router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
