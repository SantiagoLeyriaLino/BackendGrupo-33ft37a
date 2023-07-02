const { Router } = require('express');
const postHandlerProducts = require('./handlers/postHandlerProducts');
const getHandlerProducts = require('./handlers/getHandlerProducts');
const getByIdHandler = require('./handlers/getByIdHandler');
const putHandlerProducts = require('./handlers/putHandlerProducts');
const getHandlerSearch = require('./handlers/getHandlerSearch');

const products = Router();

products.post('/', postHandlerProducts);

products.get('/search', getHandlerSearch);
products.get('/', getHandlerProducts);
products.get('/:id', getByIdHandler);

products.put('/:id', putHandlerProducts);

module.exports = products;
