const { CATEGORY_CREATED } = require("../Constants/messages.constant");
const Category = require("../Schema/category.schema");

const createCategory = async (req, res) => {
    try {
        await Category.create(req.body);
        res.status(201).json({message: CATEGORY_CREATED});
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({categories});
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
}

module.exports = {createCategory, getAllCategories}