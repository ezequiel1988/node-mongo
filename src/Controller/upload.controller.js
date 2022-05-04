const User = require('../Schema/user.schema');
const cloudinary = require('../Config/cloudinary.config');
const { IMAGE_SAVED_SUCCESSFULLY } = require('../Constants/messages.constant');


const upload = async (req, res) => {
    try {
        const {user_id, file} = req;
        const upload = await cloudinary.uploader.upload(file.path)
        await User.updateOne({_id: user_id}, {avatar: upload.secure_url});
        res.status(200).json({ message: IMAGE_SAVED_SUCCESSFULLY })
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}

module.exports = { upload }