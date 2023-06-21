const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    products: {
        type: [mongoose.Types.ObjectId],
        ref: 'products'
    }
},
{
    versionKey: false,
})

module.exports = mongoose.model('Store', storeSchema)