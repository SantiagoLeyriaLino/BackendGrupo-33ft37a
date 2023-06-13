const Users = require('../../../db/models/usersSchema')
const modelateDataPaginado = require('../../../utils/modelateDataPaginate')

const getControllerUsers = async(page) =>{
    let infoUsers = await Users.find()
    let info = modelateDataPaginado(page, infoUsers)
    return info
}

module.exports = getControllerUsers