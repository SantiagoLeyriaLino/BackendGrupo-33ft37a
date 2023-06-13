const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: [String],
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    postalCode:{
        type: Number
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    // purchaseHistory:[{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'transactions',
    // }],
    isActive:{
        type: Boolean,
        default:true
    },
    // reviewsHistory:{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'reviews',
    // },
    isAdmin:{
        type:Boolean,
        default: false
    }
    
})

module.exports = mongoose.model('Users', usersScheme);