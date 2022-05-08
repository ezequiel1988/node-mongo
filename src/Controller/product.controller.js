const { PRODUCT_CREATED, PRODUCT_UPDATED, CATEGORY_NOT_FOUND } = require("../Constants/messages.constant");
const Category = require("../Schema/category.schema");
const { Product, Rating} = require("../Schema/product.schema");

const createProduct = async (req, res) => {
    try {
        const {user_id, secure_url} = req;
        const { title, price, description, category, rate, count } = req.body;

        const category_db = await Category.findOne({name: category});
        if(!category_db) return res.status(404).json({message: CATEGORY_NOT_FOUND});

        const newProduct = new Product({
            title, 
            price, 
            description, 
            category: category_db._id,
            rate,
            count,
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
        const products = await Product.find().populate({path: 'user'}).populate({path: 'category'});
        res.status(200).json({products});
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error});
    }
}

const updateProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;

        const product_updated = await Product.findByIdAndUpdate(idProduct, req.body, {new: true});
        res.status(200).json({message: PRODUCT_UPDATED, product_updated});
    } catch (error) {
        console.log(error)
        res.status(500).send({error});
    }
}

const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);
        res.status(200).json({ product });
    } catch (error) {
        console.log(error)
        res.status(500).send({error});
    }
}

module.exports = { createProduct, getAllProducts, updateProduct, getOneProduct }