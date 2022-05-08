const router = require('express').Router();
const multer  = require('multer');
const { verifyToken } = require('../Helper/token.manager');
const { createProduct, getAllProducts, updateProduct, getOneProduct } = require('../Controller/product.controller');
const { uploadProductImage } = require('../Middlewares/upload.productImage');
const uploadMulter = multer({ dest: 'uploads/' })


router.post('/products', verifyToken, uploadMulter.single('image'), uploadProductImage, createProduct);
router.get('/products', verifyToken, getAllProducts);
router.get('/products/:id', verifyToken, getOneProduct);
router.patch('/products/:idProduct', verifyToken, updateProduct);



module.exports = router;