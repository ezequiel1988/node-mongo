const { PRODUCT_CREATED } = require("../Constants/messages.constant");
const Product = require("../Schema/product.schema");

const createProduct = async (req, res) => {
    try {
        const {user_id, secure_url} = req;
        const { title, price, description, category, rate, count } = req.body;
       
        const newProduct = new Product({
            title, 
            price, 
            description, 
            category,
            rating: {
                rate, 
                count
            },
            thumbnail: secure_url, 
            user: user_id
        });
        await newProduct.save();
        res.status(200).json({message: PRODUCT_CREATED});
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate({path: 'user'});
        res.status(200).json({products});
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error});
    }
}
module.exports = { createProduct, getAllProducts }