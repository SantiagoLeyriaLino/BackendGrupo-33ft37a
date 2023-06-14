const Products = require('../../../db/models/productSchema');

const getProductsById = async (id) => {
	const product = await Products.findById(id);
	return product;
};

module.exports = getProductsById;
