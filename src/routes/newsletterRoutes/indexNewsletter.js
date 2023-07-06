const { Router } = require('express');
const postNewsletter  = require('./controllers/postNewsletter.controller')

const newsletter = Router();

newsletter.post('/', postNewsletter)

module.exports = newsletter;