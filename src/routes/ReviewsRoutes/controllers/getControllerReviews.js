const Reviews = require('../../../db/models/reviewSchema')

const getControllerReviews = async ()=> {
    const result = await Reviews.find()
    return result
}

module.exports = getControllerReviews