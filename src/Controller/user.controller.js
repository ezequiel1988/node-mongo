const User = require("../Schema/user.schema");
const { USER_ALREADY_EXIST, USER_CREATED, USER_NOT_FOUND, PASSWORD_DOES_NOT_MATCH, USER_LOGGED_IN } = require("../Constants/messages.constant");
const PasswordHash = require("../Schema/userPass.schema");
const { jwt_sign } = require("../Helper/token.manager");
const { match, hash, generate_salt } = require("../Helper/bcryp.manager");



const getAllUser = async (req, res) => {
    try {
        const pass = await PasswordHash.find().populate({path: 'user_id'})
        console.log(pass)
        res.status(200).json(pass);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
  }

  const createUser = async (req, res) => {
    try {
        
        const {email, password} = req.body;
        const userFinded = await User.findOne({email});

        if(userFinded){
            return res.status(409).send({error: USER_ALREADY_EXIST});
        }

        const salt = await generate_salt();
        const password_hash = await hash(password, salt);

        const user = new User({email, password: password_hash});

        const password_saved = new PasswordHash({
            user_id: user.id,
            password_hash,
            salt
        })

        await user.save();
        await password_saved.save();

        res.status(201).json({message: USER_CREATED});

    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
} 
  
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(401).send({error: USER_NOT_FOUND});
        
        const user_pass = await PasswordHash.findOne({id: user.id});
       
        const isMatch = await match(password, user_pass.password_hash);

        if(!isMatch) return res.status(401).send({error: PASSWORD_DOES_NOT_MATCH});
        
        const token = jwt_sign(user)

        res.status(200).json({message: USER_LOGGED_IN, token});
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}




  module.exports = { getAllUser, createUser, login };