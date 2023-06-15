const Users = require('../../../db/models/usersSchema')

const getIdControllerUser = async(id) =>{
    let info = await Users.findOne({_id:id})
    return info
}

module.exports = getIdControllerUser