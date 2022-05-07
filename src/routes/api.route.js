const { getAllUser, createUser, login } = require('../Controller/user.controller');
const { verifyToken } = require('../Helper/token.manager');
const { validator, validations } = require('../Middlewares/error.validation');
const router = require('express').Router();

router.get('/users', verifyToken ,getAllUser);
router.post('/users/register', validator, validations, createUser);
router.post('/users/login', login);

module.exports = router;
