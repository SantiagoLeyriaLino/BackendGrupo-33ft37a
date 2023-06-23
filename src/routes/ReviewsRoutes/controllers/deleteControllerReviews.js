const Reviews = require('../../../db/models/reviewSchema')

const deleteControllerReviews = async (id)=> {
    const result = Reviews.deleteOne({_id: id})
    return result
}

module.exports = deleteControllerReviews