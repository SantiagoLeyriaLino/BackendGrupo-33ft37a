const getTransactionsController = require('../controllers/getTransactionsController')

const getTransactionsHandler = async(req, res) =>{
    try{
        let info = await getTransactionsController()
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = getTransactionsHandler