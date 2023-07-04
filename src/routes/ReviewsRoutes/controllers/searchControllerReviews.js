const Reviews = require('../../../db/models/reviewSchema')

const searchControllerReviews = async (user, product)=> {
    let result = [] 
    if (user && product) {
        result = await Reviews.find({ UserID: user, ProductID: product })
    } else if (user) {
        result = await Reviews.find({ UserID: user })
    } else if (product) {
        result = await Reviews.find({ ProductID: product })
    }

    return result
}

module.exports = searchControllerReviews