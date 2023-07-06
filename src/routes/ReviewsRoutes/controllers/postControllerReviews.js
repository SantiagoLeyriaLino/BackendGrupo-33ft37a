const Reviews = require('../../../db/models/reviewSchema')
const Products = require('../../../db/models/productSchema')

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
            const reviews = await Reviews.find({ StoreID: StoreID, ProductID: ProductID });

            const totalRatings = reviews.reduce((sum, review) => sum + review.ratings, 0);
            const averageRating = totalRatings / reviews.length;
            
            await Products.findOneAndUpdate({_id:ProductID},{rating:averageRating})

            return response
        } else {
            throw new Error('Wrong data')
        }
    } else {
        throw new Error('Raiting values not in range')
    }
}

module.exports = postControllerReviews