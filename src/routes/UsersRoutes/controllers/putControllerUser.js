const Users = require('../../../db/models/usersSchema')

const putControllerUser = async(id, data) =>{
    let infoUser = await Users.findOneAndUpdate(
        {_id:id},
        {$set:data},
        { new: true }
    )
    return infoUser
}

module.exports = putControllerUser