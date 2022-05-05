const bcrypt = require("bcrypt");

const match = async (pass, pass_stored) => await bcrypt.compare(pass, pass_stored);

const generate_salt = async () => await bcrypt.genSalt(10)

const hash = async (password, salt) => await bcrypt.hash(password, salt)

module.exports = { match, hash, generate_salt };