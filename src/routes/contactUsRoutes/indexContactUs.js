const {Router} = require('express')

const postContactUsHandler = require('./handlers/postContactUsHandler')

const contactUs = Router()

contactUs.post('/', postContactUsHandler)

module.exports = contactUs