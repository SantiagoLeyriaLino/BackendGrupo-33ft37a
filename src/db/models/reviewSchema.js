const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	UserID: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    ratings: {
        type: Number,
        required: true,
        max: 5,
        min: 1
    },
    comment: {
        type: String,
        required: true,
        maxlength: 320
    },
    StoreID: {
        type: mongoose.Types.ObjectId,
        ref: 'store'
    },
    ProductID: {
        type: mongoose.Types.ObjectId,
        ref: 'products'
    }
},
{
    versionKey: false,
}
);

const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review;
