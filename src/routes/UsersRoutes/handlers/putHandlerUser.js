const putControllerUser = require('../controllers/putControllerUser') 

const putHandlerUser = async(req,res) =>{
    try{ 
        const {id} = req.params;
        const data = req.body;
        let info = await putControllerUser(id, data)
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = putHandlerUser