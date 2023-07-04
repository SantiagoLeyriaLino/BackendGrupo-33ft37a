const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate');
const AutoIncrementFactory = require('mongoose-sequence');

const autoIncrementFactory = AutoIncrementFactory(mongoose);

const transactionsSchema = new Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    amount:{
        type: Number,
        required: true 
    },
    products:{
       type:[
        {
            productId:{
                type: mongoose.Types.ObjectId,
                ref: 'Products',
                autopopulate:true,
                required: true,
            },
            size:{
                type:String
            },
            cant:{
                type: Number,
                required:true
            }
        }
       ]
    },
    date: {
        type: String,
        required:true
    },
    status:{
        type: String,
        default: "Pending"
    },
    
},{
    versionKey: false
});


transactionsSchema.plugin(autopopulate);

//comentario para deploy
const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = Transactions;