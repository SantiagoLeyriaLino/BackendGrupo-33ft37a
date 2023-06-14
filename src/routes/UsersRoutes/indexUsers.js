const {Router} = require('express')
const getHandlerUsers = require('./handlers/getHandlerUsers')
const postHandlerUsers = require('./handlers/postHandlerUsers')
const getIdHandlerUser = require('./handlers/getIdHandlerUser')
const loginHandler = require('./handlers/loginHandler')

const users = Router()

users.get('/', getHandlerUsers)

users.get('/login', loginHandler)

users.get('/:id', getIdHandlerUser)

users.post('/', postHandlerUsers)

module.exports = users