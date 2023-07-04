const Products = require('../../../db/models/productSchema');
const modelateDataPaginado = require('../../../utils/modelateDataPaginate');

const getControllerSearch = async (query) => {
	const filter = {};
	for (const key in query) {
		if (query.hasOwnProperty(key)) {
			if (['color', 'brand', 'season', 'gender', 'category'].includes(key)) {
				filter[key] = {
					$in: query[key].split(','),
				};
			} else if (key === 'size') {
				const sizes = query[key];
				const regexSizes = sizes.split(',').join('|');
				filter[key] = {
					$regex: new RegExp(`\\b(${regexSizes})\\b`, 'i'),
				};
			} else if (['name'].includes(key)) {
				filter[key] = { $regex: new RegExp(query[key], 'i') };
			} else if (key === 'price') {
				filter['price'] = { $lt: parseInt(query[key]) };
			}
		}
	}

	const queryResult = await Products.find(filter);

	const products = [];
	for (let product of queryResult) {
		let stockSum = 0;
		for (let i = 0; i < product.size.length; i++) {
			let obj = product.size[i];
			obj.stock = parseInt(obj.stock);
			stockSum += obj.stock;
		}
		product = { ...product.toObject(), stock: stockSum };
		const sameCodeProducts = await Products.find({
			$and: [
				{ _id: { $ne: product._id } },
				{
					articleCode: product.articleCode,
				},
			],
		})
			.select({
				name: 1,
				images: { $slice: 1 },
				size: { $slice: -1 },
				brand: 1,
				price: 1,
				articleCode: 1,
			})
			.exec();
		const productWithSameCode = {
			...product,
			sameCode: sameCodeProducts,
		};
		delete productWithSameCode._doc;
		products.push(productWithSameCode);
	}
	if(products.length>0){

		return products;
	}else{
		throw Error("no products")
	}
};

module.exports = getControllerSearch;
