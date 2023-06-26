const Transactions = require('../../../db/models/transactionsSchema')

const getIdTransactionController = async(id) =>{
    const data = await Transactions.findOne({_id:id})
    return data
}

module.exports = getIdTransactionController