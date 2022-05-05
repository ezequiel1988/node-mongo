const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    avatar: String,
    pass_stored: {
        type: Schema.Types.ObjectId,
        ref: 'hash'
    }
})

const User = model('user', userSchema);

module.exports = User;
