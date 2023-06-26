const Products = require('../../../db/models/productSchema');
const modelateDataPaginado = require('../../../utils/modelateDataPaginate');

const getControllerProducts = async () => {
	const allProducts = await Products.find({})
		.select({
			name: 1,
			images: { $slice: -1 },
			size: 1,
			brand: 1,
			price: 1,
		})
		.lean()
		.exec();

	const products = [];
	for (let product of allProducts) {
		let stockSum = 0
		for (let i = 0; i < product.size.length; i++) { 
		const obj = product.size[i];
		obj.stock = parseInt(obj.stock); 
		stockSum += obj.stock;
	  }
	  product = {...product,stock:stockSum}
		const sameCodeProducts = await Products.find({
			articleCode: product.articleCode,
		})
			.select({
				name: 1,
				images: { $slice: -1 },
				size: { $slice: -1 },
				brand: 1,
				price: 1,
				articleCode: 1,
			})
			.lean()
			.exec();
		const productWithSameCode = { ...product, sameCode: sameCodeProducts };
		products.push(productWithSameCode);
	}

	return products;
};

module.exports = getControllerProducts;


