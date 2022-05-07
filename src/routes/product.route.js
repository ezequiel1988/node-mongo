const router = require('express').Router();
const multer  = require('multer');
const { verifyToken } = require('../Helper/token.manager');
const { createProduct, getAllProducts } = require('../Controller/product.controller');
const { uploadProductImage } = require('../Middlewares/upload.productImage');
const uploadMulter = multer({ dest: 'uploads/' })


router.post('/products', verifyToken, uploadMulter.single('image'), uploadProductImage, createProduct);
router.get('/products', verifyToken, getAllProducts);


module.exports = router;