const { Router } = require('express')
const postHandlerReviews = require('./handlers/postHandlerReviews')
const getHandlerReviews = require('./handlers/getHandlerReviews')
const deleteHandlerReviews = require('./handlers/deleteHandlerReviews')
const searchHandlerReviews = require('./handlers/searchHandlerReviews')

const router = Router()
router.post('/', postHandlerReviews)
router.get('/', getHandlerReviews)
router.get('/search', searchHandlerReviews)
router.delete('/:id', deleteHandlerReviews)

module.exports = router