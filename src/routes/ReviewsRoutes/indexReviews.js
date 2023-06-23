const { Router } = require('express')
const postHandlerReviews = require('./handlers/postHandlerReviews')
const getHandlerReviews = require('./handlers/getHandlerReviews')
const deleteHandlerReviews = require('./handlers/deleteHandlerReviews')

const router = Router()
router.post('/', postHandlerReviews)
router.get('/', getHandlerReviews)
router.delete('/:id', deleteHandlerReviews)

module.exports = router