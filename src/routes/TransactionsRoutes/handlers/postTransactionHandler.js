const postTransactionController = require('../controllers/postTransactionController')

const postTransactionHandler = async(req, res) =>{
    try{
        let data = req.body;
        let info = await postTransactionController(data);
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = postTransactionHandler