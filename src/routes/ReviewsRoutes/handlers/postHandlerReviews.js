const postControllerReviews = require('../controllers/postControllerReviews')

const postHandlerReviews = async (req, res)=> {
    try {
        const data = req.body
        if (Object.keys(data).length){
            const response = await postControllerReviews(data)
            res.status(200).json({message: 'The review has been created successfully!', data: response})
        } else {
            throw new Error('Request data empty')
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = postHandlerReviews