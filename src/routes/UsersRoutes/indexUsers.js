const { Router } = require('express');
const getHandlerUsers = require('./handlers/getHandlerUsers');
const postHandlerUsers = require('./handlers/postHandlerUsers');
const getIdHandlerUser = require('./handlers/getIdHandlerUser');
const loginHandler = require('./handlers/loginHandler');
const putHandlerUser = require('./handlers/putHandlerUser');
const getByEmailHandler = require('./handlers/getByEmailHandler');

const users = Router();

users.get('/login', loginHandler);
users.get('/:id', getIdHandlerUser);
users.get('/auth/:email', getByEmailHandler);
users.put('/:id', putHandlerUser);
users.get('/', getHandlerUsers);
users.post('/', postHandlerUsers);
// comentario
module.exports = users;
