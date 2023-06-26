const getIdTransactionController = require('../controllers/getIdTransactionController')

const getIdTransactionHandler = async(req, res) =>{
    try{
        const {id} = req.params;
        let info = await getIdTransactionController(id);
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = getIdTransactionHandler