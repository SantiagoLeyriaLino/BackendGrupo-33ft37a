const postControllerPurchase = require("../controllers/postPurchase.controller")


const postHandlerPurchase = async(req, res) =>{
    
    try{
        let {email} = req.body
        let info = await postControllerPurchase(email)
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = postHandlerPurchase