const Products = require('../../../db/models/productSchema');

const getProductsById = async (id) => {
	let product = await Products.findById(id);
	let stockSum = 0
		for (let i = 0; i < product.size.length; i++) { 
		const obj = product.size[i];
		obj.stock = parseInt(obj.stock); 
		stockSum += obj.stock;
	  }
	  product = {...product.toObject(),stock:stockSum}
	const code = product.articleCode;
	const sameCode = await Products.find({
		$and: [{ _id: { $ne: id } }, { articleCode: code }],
	});
	return [product, sameCode];
};

module.exports = getProductsById;
