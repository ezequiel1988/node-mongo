
const { validationResult,body } = require('express-validator');

const validator = [
    body('email').isEmail(),
    body('password').isLength({min: 8})
]

const validations = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports= { validations, validator };