const deleteControllerReviews = require('../controllers/deleteControllerReviews')

const deleteHandlerReviews = async (req, res)=> {
    try {
        const { id } = req.params
        if(id) {
            const response = deleteControllerReviews(id)
            res.status(200).json({ message: 'The review has been deleted succesfully!' })
        } else {
            throw new Error('Empty ID')
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = deleteHandlerReviews