const Users = require('../../../db/models/usersSchema')
const bcrypt = require('bcryptjs')

const loginController = async(password,email) =>{
    let user = await Users.findOne({ email: email });
    if(user){
        let compare = bcrypt.compareSync(password, user.password)
        if(compare){
            return user
        }else{
            throw new Error ('contraseña incorrecta')
        }
    }else{
        throw new Error ('Usuario inexistente')
    }
}

module.exports = loginController