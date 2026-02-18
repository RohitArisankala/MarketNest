const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    logoutUser,
    getMe,
    updateProfile,
    googleCallback,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const passport = require('passport');

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// Google Auth
// Google Auth
router.get('/google', (req, res, next) => {
    const state = req.query.role || 'user';
    passport.authenticate('google', { scope: ['profile', 'email'], state })(req, res, next);
});

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    googleCallback
);

module.exports = router;
