const Users = require('../../../db/models/usersSchema')
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { TOKEN_KEY } = process.env;

const putControllerUser = async(id, data, firebaseUrls) =>{
    if (firebaseUrls){
        await Users.findOneAndUpdate({ _id: id }, { image: firebaseUrls }, { new: true })
    }
    let infoUser = await Users.findOneAndUpdate(
        {_id:id},
        {$set:data},
        { new: true }
    )

    const token = jwt.sign(
        {
          _id: infoUser._id,
          email: infoUser.email,
          isAdmin: infoUser.isAdmin,
        },
        TOKEN_KEY,
        {
          expiresIn: "7d",
        }
      );

      infoUser = {...infoUser.toObject(), token:token}

    return infoUser
}

module.exports = putControllerUser