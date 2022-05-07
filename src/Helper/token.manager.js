const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


const verifyToken = async (req, res, next) => {
    try {
        const bearer_token = req.headers['authorization'];
        if(!bearer_token) return res.status(401).send({error: "Token not found"});
        
        const token = bearer_token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if(!decoded) return res.status(401).send({error: "Token invalid"});

        req.user_id = decoded.user_id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}

const jwt_sign = (user) => jwt.sign({user_id: user.id}, process.env.SECRET_KEY, { expiresIn: 60 * 60 });

module.exports = { verifyToken, jwt_sign }