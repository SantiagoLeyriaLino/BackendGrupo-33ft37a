const Users = require('../../../db/models/usersSchema')
const bcrypt = require('bcryptjs')

const postControllerUsers = async(data, firebaseUrls) =>{
    const saltRounds = 8;
    let password = await bcrypt.hash(data.password, saltRounds)
    console.log(password)
    let user = {
        name: data.name,
        email: data.email,
        image: firebaseUrls,
        password: password,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
        phoneNumber: data.phoneNumber
    } 
    let infoUser = await Users.create(user);
    return infoUser 
}

module.exports = postControllerUsers