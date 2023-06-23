const Products = require('../../../db/models/productSchema');

const postControllerProduct = async (data, firebaseUrls) => {
	console.log(data)
	let stockSum = 0;
	console.log(data.size)
	let arr = []
    for (let i = 0; i < data.size.length; i++) {
		const obj = JSON.parse(data.size[i])
		arr.push(obj)
		console.log(obj)
        stockSum += obj.stock;
    }
	console.log(stockSum)
	const product = {
		name: data.name,
		category: data.category,
		gender: data.gender,
		size: arr,
		color: data.color,
		season: data.season,
		images: firebaseUrls,
		stock: stockSum,
		brand: data.brand,
		price: data.price,
		articleCode: data.articleCode,
	};

	const result = Products.create(product);
	return result;
};

module.exports = postControllerProduct;
