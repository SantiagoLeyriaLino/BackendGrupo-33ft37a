const Reviews = require('../../../db/models/reviewSchema')

const searchControllerReviews = async (user, product)=> {
    let result = []
    if (user && product) {
        throw new Error('You cannot send both product and user IDs')
    } else if (user) {
        result = await Reviews.find({ UserID: user })
    } else if (product) {
        result = await Reviews.find({ ProductID: product })
    } 
    
    if (result.length === 0) {
        result = []
    }

    return result
}

module.exports = searchControllerReviews