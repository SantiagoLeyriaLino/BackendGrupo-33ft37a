const loginController = require('../controllers/loginControlleer')

const loginHandler = async(req, res) =>{
    try{
        const {password, email} = req.query
        let info = await loginController(password, email)
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = loginHandler