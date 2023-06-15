const Store = require('../../../db/models/storeSchema')

const deleteControllerStore = async (id)=> {
    const result = await Store.deleteOne({ _id: id}) // fijarse como arrojar error por ID inexistente
    if (result.deletedCount)
        return
    else {
        throw new Error('No se encontró una tienda con ese ID.')
    }
}

module.exports = deleteControllerStore