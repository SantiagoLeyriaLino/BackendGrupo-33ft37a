const Users = require('../../../db/models/usersSchema')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { TOKEN_KEY } = process.env;

const loginController = async(password,email) =>{
    let user = await Users.findOne({ email: email });
    if(user){
        let compare = bcrypt.compareSync(password, user.password)
        if(compare){
            const token = jwt.sign(
                {
                  _id: user._id,
                  email: user.email,
                  isAdmin: user.isAdmin,
                },
                TOKEN_KEY,
                {
                  expiresIn: "7d",
                }
              );
              user = {...user.toObject(), token:token}
            return user
        }else{
            throw new Error ('contraseña incorrecta')
        }
    }else{
        throw new Error ('Usuario inexistente')
    }
}

module.exports = loginController