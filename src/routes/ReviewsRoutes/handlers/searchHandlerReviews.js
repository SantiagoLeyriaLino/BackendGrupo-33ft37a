const searchControllerReviews = require('../controllers/searchControllerReviews')

const searchHandlerReviews = async (req, res)=> {
    try {
        const { user, product } = req.query
        const response = await searchControllerReviews(user, product)
        res.status(200).json(response)
    } catch (err){
        res.status(400).json({ error: err.message})
    }
}

module.exports = searchHandlerReviews