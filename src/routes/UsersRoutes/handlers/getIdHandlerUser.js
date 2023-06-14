const getIdControllerUser = require("../controllers/getIdControllerUser");


const getIdHandlerUser = async(req, res) =>{
    try{
        const {id} = req.params;
        let info = await getIdControllerUser(id)
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = getIdHandlerUser