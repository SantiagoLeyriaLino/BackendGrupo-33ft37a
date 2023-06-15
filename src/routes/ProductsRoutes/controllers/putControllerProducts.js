const Products = require('../../../db/models/productSchema');

const putControllerProducts = async (id, updatedData) => {
	const productUpdate = await Products.findByIdAndUpdate(id, updatedData, {
		new: true,
	});
	console.log(productUpdate);
	return productUpdate;
};

module.exports = putControllerProducts;
