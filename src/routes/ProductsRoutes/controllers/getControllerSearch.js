const Products = require('../../../db/models/productSchema');
const modelateDataPaginado = require('../../../utils/modelateDataPaginate');

const getControllerSearch = async (page, query) => {
	const filter = {};
	for (const key in query) {
		if (query.hasOwnProperty(key)) {
			if (key === 'color' || key === 'size') {
				filter[key] = { $in: query[key] };
			} else if (
				['brand', 'category', 'gender', 'season', 'name'].includes(key)
			) {
				filter[key] = { $regex: new RegExp(query[key], 'i') };
			}
		}
	}
	const queryResult = await Products.find(filter);
	const response = modelateDataPaginado(page, queryResult);
	return response;
};

module.exports = getControllerSearch;
