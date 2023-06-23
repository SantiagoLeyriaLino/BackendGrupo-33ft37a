const Products = require('../../../db/models/productSchema');
const modelateDataPaginado = require('../../../utils/modelateDataPaginate');

const getControllerSearch = async (page, query) => {
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
			}
		}
	}

	const queryResult = await Products.find(filter);

	const products = [];
	for (const product of queryResult) {
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
				images: { $slice: 0 },
				size: { $slice: -1 },
				brand: 1,
				price: 1,
				articleCode: 1,
			})
			.exec();
		const productWithSameCode = {
			...product.toObject(),
			sameCode: sameCodeProducts,
		};
		delete productWithSameCode._doc;
		products.push(productWithSameCode);
	}
	const response = modelateDataPaginado(page, products);
	return response;
};

module.exports = getControllerSearch;
