const putControllerUser = require('../controllers/putControllerUser') 

const putHandlerUser = async(req,res) =>{
    try{ 
        let {_id, isAdmin} = req.user
        console.log(isAdmin)
        let firebaseUrls;
        if(req.files){
        firebaseUrls = req.files.map((file) => file.firebaseUrl);
        }
        const {id} = req.params;
        const data = req.body;
        if(_id==id || isAdmin==true){
            let info = await putControllerUser(id, data, firebaseUrls)
            res.status(200).json(info)
        }else{
            throw Error("invalid token")
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = putHandlerUser