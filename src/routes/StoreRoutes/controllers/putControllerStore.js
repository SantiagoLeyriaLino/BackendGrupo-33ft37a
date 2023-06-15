const Store = require('../../../db/models/storeSchema')

const putControllerStore = async (id, value)=> {
    const storeId = id
    const updatedValue = value
    const result = await Store.updateOne({ _id: storeId }, updatedValue)
    if (result.modifiedCount){
        return { id: id, value: updatedValue}
    } else {
        throw new Error('No se encontro una tienda con ese ID.')
    }
}

module.exports = putControllerStore