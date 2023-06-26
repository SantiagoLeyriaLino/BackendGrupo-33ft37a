const {Router} = require('express');

const postTransactionHandler = require('./handlers/postTransactionHandler')
const getTransactionsHandler = require('./handlers/getTransactionsHandler')
const getIdTransactionHandler = require('./handlers/getIdTransactionHandler')
const getHistoryTransactionsHandler = require('./handlers/getHistoryTransactionsHandler')

const transactions = Router();


transactions.post('/', postTransactionHandler)
transactions.get('/', getTransactionsHandler)
transactions.get('/transaction/:id', getIdTransactionHandler)
transactions.get('/history/:id', getHistoryTransactionsHandler)
module.exports = transactions