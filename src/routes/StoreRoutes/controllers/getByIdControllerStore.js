const Store = require('../../../db/models/storeSchema')

const getByIdControllerStore = async (id)=> {
    const result = await Store.findById(id)
    if (result) {
        return result
    } else {
        throw new Error('No se ha encontrado una tienda con ese id.')
    }
}

module.exports = getByIdControllerStore