const Users = require('../../../db/models/usersSchema')
const bcrypt = require('bcryptjs')
const {sendBuy} = require('../../../services/nodeMailer')

const postControllerPurchase = async(email) =>{
    
    console.log(email)
    let resp = 'algo'
    if(email){
        resp = email
    }

    await sendBuy(email)
    // await sendBuy(data.email)

    return resp
}
//comentario
module.exports = postControllerPurchase


