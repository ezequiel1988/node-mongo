
const user_finded = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({email});

        if(!user) return res.status(401).send({error: USER_NOT_FOUND});
        if(user) return res.status(409).send({error: USER_ALREADY_EXIST});

        next()
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}