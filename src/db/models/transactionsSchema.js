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
    purchaseNumber:{
        type: Number,
        unique:true
    }
},{
    versionKey: false
});


transactionsSchema.plugin(autopopulate);

transactionsSchema.plugin(autoIncrementFactory, {
    id: 'numero_autoincrement',
    inc_field: 'purchaseNumber',
    start_seq: 0,
    format: '%09d' // Formato de 9 dígitos con ceros a la izquierda
  });

const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = Transactions;