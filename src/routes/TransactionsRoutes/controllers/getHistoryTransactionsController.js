const Transactions = require('../../../db/models/transactionsSchema')

const getHistoryTransactionsController = async(id) =>{
    let data = Transactions.find({idUser:id});
    return data
}

module.exports = getHistoryTransactionsController