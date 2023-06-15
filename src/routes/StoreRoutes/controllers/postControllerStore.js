const Store = require('../../../db/models/storeSchema')

const postControllerStore = async (data, firebaseUrls)=> {
    const newStore = {
        name: data.name,
        images: firebaseUrls,
        email: data.email,
        country: data.country,
        city: data.city,
        address: data.address,
        phoneNumber: data.phoneNumber,
        products: [] // por ahora no se recibe 'products'. establece valor por default
    }

    await Store.create(newStore)
    return newStore
}

module.exports = postControllerStore