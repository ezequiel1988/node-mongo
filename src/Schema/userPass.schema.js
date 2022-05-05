const { Schema, model } = require('mongoose');

const passwordHash = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    password_hash: String,
    salt: String

})

const PasswordHash = model('hash', passwordHash);

module.exports = PasswordHash;
