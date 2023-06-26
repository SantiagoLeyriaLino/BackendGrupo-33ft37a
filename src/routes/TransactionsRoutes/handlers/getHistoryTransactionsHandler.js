const getHistoryTransactionsController = require('../controllers/getHistoryTransactionsController')

const getHistoryTransactionsHandler = async(req, res) =>{
    try{
        const {id} = req.params;
        let info = await getHistoryTransactionsController(id)
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = getHistoryTransactionsHandler