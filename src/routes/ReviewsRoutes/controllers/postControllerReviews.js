const Reviews = require('../../../db/models/reviewSchema')

const postControllerReviews = async (data)=> {
    const { comment, UserID } = data
    const ProductID = data.ProductID || null
    const StoreID = data.StoreID || null
    const ratings = parseInt(data.ratings)

    if (ratings >= 1 && ratings <= 5){
        if (UserID && ratings && comment && 
            ( ( StoreID || ProductID ) && !( StoreID && ProductID ) )) { // OR Exclusivo
            const response = await Reviews.create({
                UserID: UserID,
                ratings: ratings,
                comment: comment,
                StoreID: StoreID,
                ProductID: ProductID
            })
            return response
        } else {
            throw new Error('Wrong data')
        }
    } else {
        throw new Error('Raiting values not in range')
    }
}

module.exports = postControllerReviews