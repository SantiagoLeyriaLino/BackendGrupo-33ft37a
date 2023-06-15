const { Router } = require('express')
const getHandlerStore = require('./handlers/getHandlerStore')
const postHandlerStore = require('./handlers/postHandlerStore')
const getByIdHandlerStore = require('./handlers/getByIdHandlerStore')
const putHandlerStore = require('./handlers/putHandlerStore')
const deleteHandlerStore = require('./handlers/deleteHandlerStore')

const store = Router()

store.get('/', getHandlerStore)
store.get('/:id', getByIdHandlerStore)

store.post('/', postHandlerStore)

store.put('/:id', putHandlerStore)

store.delete('/:id', deleteHandlerStore)

module.exports = store