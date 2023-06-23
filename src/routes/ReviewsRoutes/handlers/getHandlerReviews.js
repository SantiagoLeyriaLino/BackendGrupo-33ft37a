const getControllerReviews = require('../controllers/getControllerReviews')

const getHandlerReviews = async (req, res)=> {
    try {
        const response = await getControllerReviews()
        res.status(200).json(response)
    } catch (err){
        res.status(400).json({ error: err.message})
    }
}

module.exports = getHandlerReviews