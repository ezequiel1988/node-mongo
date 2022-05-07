const { Schema, model } = require('mongoose');

const ratingSchema = new Schema({
    rate: Number,
    count: Number
    
}, { _id: false });

const productSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    thumbnail: String,
    rating: {
        type: ratingSchema
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Product = model('product', productSchema);

module.exports = Product;
