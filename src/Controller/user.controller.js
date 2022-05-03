const User = require("../Schema/user.schema");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');



const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
  }

  const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        const {email, password} = req.body;
        const userFinded = await User.findOne({email});

        if(userFinded){
            return res.status(409).send({error: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const user = new User({email, password: password_hash});
        await user.save();
        res.status(201).json({message: "User created"});

    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
} 
  
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send({error: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).send({error: "Password does not match"});
        }
        var token = jwt.sign({user_id: user.id}, process.env.SECRET_KEY, { expiresIn: 60 * 2 });

        res.status(200).json({message: "User logged in", token});
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}


const verifyToken = async (req, res, next) => {
    try {
        const bearer_token = req.headers['authorization'];
        const token = bearer_token.split(' ')[1];
        if(!token){
            return res.status(401).send({error: "Token not found"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if(!decoded) return res.status(401).send({error: "Token invalid"});

        req.user_id = decoded.user_id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}

  module.exports = { getAllUser, createUser, login, verifyToken };