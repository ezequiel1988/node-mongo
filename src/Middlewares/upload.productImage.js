const cloudinary = require("../Config/cloudinary.config");

const uploadProductImage = async (req, res, next) => {
    try {
        const {file} = req;
        const upload = await cloudinary.uploader.upload(file.path, {folder: 'products'});
        req.secure_url = upload.secure_url;
        next()
    } catch (error) {
        console.error(error);
        res.status(500).send({error});
    }
}

module.exports = { uploadProductImage };