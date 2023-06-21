const Products = require('../../../db/models/productSchema');

const getProductsById = async (id) => {
	const product = await Products.findById(id);
	const code = product.articleCode;
	const sameCode = await Products.find({
		$and: [{ _id: { $ne: id } }, { articleCode: code }],
	});
	return [product, sameCode];
};

module.exports = getProductsById;
