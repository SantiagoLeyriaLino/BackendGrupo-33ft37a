const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersScheme = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: [String],
        default:["https://st2.depositphotos.com/1523669/6194/i/950/depositphotos_61945927-stock-photo-icon-of-businessman.jpg"]
    },
    email:{
        type: String,
        required: true,
        unique: true
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
},
{
    versionKey: false,
  })

module.exports = mongoose.model('Users', usersScheme);