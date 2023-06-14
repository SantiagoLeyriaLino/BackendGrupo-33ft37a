const Products = require('../../../db/models/productSchema');

const getControllerSearch = async (query) => {
	//logica para queries no exactas
	const queryResult = await Products.find(query);
	return queryResult;
};

module.exports = getControllerSearch;
