const Store = require('../../../db/models/storeSchema')

const getControllerStore = async ()=> {
    const result = await Store.find()
    return result
}

module.exports = getControllerStore