const Products = require('../../../db/models/productSchema');

const postControllerProduct = async (data, firebaseUrls) => {
	const product = {
		name: data.name,
		category: data.category,
		gender: data.gender,
		size: data.size,
		color: data.color,
		season: data.season,
		images: firebaseUrls,
		stock: data.stock,
		brand: data.brand,
		price: data.price,
	};

	const result = Products.create(product);
	return result;
};

module.exports = postControllerProduct;
