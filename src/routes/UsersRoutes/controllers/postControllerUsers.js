const Users = require('../../../db/models/usersSchema')

const postControllerUsers = async(data) =>{
    let user = {
        name: data.name,
        email: data.email,
        password: data.password,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
        phoneNumber: data.phoneNumber
    } 
    let infoUser = await Users.create(user);
    return infoUser 
}

module.exports = postControllerUsers