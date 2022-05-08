const { Schema, model } = require('mongoose');

const ratingSchema = new Schema({
    rate: Number,
    count: Number
    
});

const productSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    thumbnail: String,
    rate: Number,
    count: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Product = model('product', productSchema);
const Rating = model('rating', ratingSchema);

module.exports = {Product, Rating};
