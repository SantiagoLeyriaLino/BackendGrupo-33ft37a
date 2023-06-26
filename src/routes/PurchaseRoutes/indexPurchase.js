const { Router } = require('express');
const postHandlerPurchase  = require('./handlers/postHandlerPurchase')

const purchase = Router();

purchase.post('/', postHandlerPurchase)

module.exports = purchase;