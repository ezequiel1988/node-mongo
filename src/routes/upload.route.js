const { upload } = require('../Controller/upload.controller');
const router = require('express').Router();
const multer  = require('multer');
const { verifyToken } = require('../Helper/token.manager');
const uploadMulter = multer({ dest: 'uploads/' })


router.post('/image/upload', verifyToken, uploadMulter.single('avatar'), upload);


module.exports = router;