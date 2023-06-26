const { Router } = require('express');
const createStripe  = require('./controllers/postPaymentIntent.controller')

const payment = Router();

payment.post('/', createStripe)

module.exports = payment;