const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    avatar: String,
})

const User = model('user', userSchema);

module.exports = User;
