const Transactions = require('../../../db/models/transactionsSchema')

const getTransactionsController = async() =>{
    const data = Transactions.find()
    return data
}

module.exports = getTransactionsController