const getControllerUsers = require("../controllers/getControllerUsers")


const getHandlerUsers = async(req, res) =>{
    try{
        let {page} = req.query
        let info = await getControllerUsers(page||1)
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = getHandlerUsers