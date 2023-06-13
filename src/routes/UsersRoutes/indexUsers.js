const {Router} = require('express')
const getHandlerUsers = require('./handlers/getHandlerUsers')
const postHandlerUsers = require('./handlers/postHandlerUsers')

const users = Router()

users.get('/', getHandlerUsers)

users.post('/', postHandlerUsers)

module.exports = users