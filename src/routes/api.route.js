const { body, validationResult } = require('express-validator');

const { getAllUser, createUser, login, verifyToken } = require('../Controller/user.controller');

const router = require('express').Router();

router.get('/users',verifyToken ,getAllUser);
router.post('/users/register', body('email').isEmail(),body('password').isLength({min: 8}), createUser);
router.post('/users/login', login);

module.exports = router;
