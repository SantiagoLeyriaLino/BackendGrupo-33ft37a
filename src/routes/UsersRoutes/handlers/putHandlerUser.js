const putControllerUser = require('../controllers/putControllerUser') 

const putHandlerUser = async(req,res) =>{
    try{ 
        let firebaseUrls;
        if(req.files){
        firebaseUrls = req.files.map((file) => file.firebaseUrl);
        }
        const {id} = req.params;
        const data = req.body;
        let info = await putControllerUser(id, data, firebaseUrls)
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = putHandlerUser