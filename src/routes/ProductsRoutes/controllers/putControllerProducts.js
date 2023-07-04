const Products = require('../../../db/models/productSchema');

const putControllerProducts = async (id, updatedData, firebaseUrls) => {
	let stockSum = 0;
	console.log(updatedData.size);
	let arr = [];
	for (let i = 0; i < updatedData.size.length; i++) {
		const obj = JSON.parse(updatedData.size[i]);
		obj.stock = parseInt(obj.stock);
		arr.push(obj);
		console.log(obj);
		stockSum += obj.stock;
	}
	const product = {
		name: updatedData.name,
		category: updatedData.category,
		gender: updatedData.gender,
		size: arr,
		color: updatedData.color,
		season: updatedData.season,
		images: firebaseUrls,
		// stock: stockSum,
		brand: updatedData.brand,
		price: updatedData.price,
		articleCode: updatedData.articleCode,
	};
	if (firebaseUrls) {
		await Products.findOneAndUpdate(
			{ _id: id },
			{ images: firebaseUrls },
			{ new: true },
		);
	}
	const productUpdate = await Products.findByIdAndUpdate(id, product, {
		new: true,
	});
	return productUpdate;
};

module.exports = putControllerProducts;
