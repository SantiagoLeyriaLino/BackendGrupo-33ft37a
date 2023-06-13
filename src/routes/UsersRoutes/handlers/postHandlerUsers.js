const postControllerUsers = require("../controllers/postControllerUsers")


const postHandlerUsers = async(req, res) =>{
    try{
        let data = req.body
        let info = await postControllerUsers(data)
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = postHandlerUsers