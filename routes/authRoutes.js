const { Router } = require('express');
const authController = require('../controllers/authController');
const {isLoggedIn} = require('../middleware/authMiddleware');
const passport = require("passport");

const router = Router();
router.get('/profile', authController.profile_get);
router.get('/likes', authController.likes_get);

router.get('/settings', authController.settings_get);
router.put('/settings', authController.settings_put);

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login',  authController.login_get);
router.post('/login',
passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' ,keepSessionInfo: true}),
authController.login_post); 

router.get('/logout', isLoggedIn, authController.logout_get); 
router.get('/:username', authController.profile_get);

router.get('/test', (req, res) => {
    console.log("adsa")
    res.redirect('/');
})

module.exports = router;