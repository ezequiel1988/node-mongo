const router = require('express').Router();
const { createCategory, getAllCategories } = require('../Controller/category.controller');
const { verifyToken } = require('../Helper/token.manager');

router.post('/categories', verifyToken, createCategory);
router.get('/categories', verifyToken, getAllCategories);

module.exports = router;