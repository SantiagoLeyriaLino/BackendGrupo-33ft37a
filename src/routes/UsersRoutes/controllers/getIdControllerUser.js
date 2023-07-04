const Users = require('../../../db/models/usersSchema')
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { TOKEN_KEY } = process.env;

const getIdControllerUser = async(id) =>{
    let info = await Users.findOne({_id:id})
    const token = jwt.sign(
        {
          _id: info._id,
          email: info.email,
          isAdmin: info.isAdmin,
        },
        TOKEN_KEY,
        {
          expiresIn: "7d",
        }
      );

      info = {...info.toObject(), token:token}
    return info
}

module.exports = getIdControllerUser