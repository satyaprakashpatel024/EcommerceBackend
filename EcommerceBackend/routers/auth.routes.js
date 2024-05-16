const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', [authMiddleware.verifySignupData], controller.signup);
router.post('/signin', [authMiddleware.verifySigninData], controller.login);

module.exports = router;
