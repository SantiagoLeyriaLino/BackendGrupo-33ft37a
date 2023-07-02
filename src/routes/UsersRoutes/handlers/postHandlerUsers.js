const postControllerUsers = require("../controllers/postControllerUsers")


const postHandlerUsers = async(req, res) =>{
    
    try{
        let firebaseUrls;
        if(req.files){
        firebaseUrls = req.files.map((file) => file.firebaseUrl);
        }
        let data = req.body
        let info = await postControllerUsers(data, firebaseUrls)
        res.status(200).json(info)
    }catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

module.exports = postHandlerUsers