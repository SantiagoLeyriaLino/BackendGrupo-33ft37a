const Products = require('../../../db/models/productSchema');
const modelateDataPaginado = require('../../../utils/modelateDataPaginate');

const getControllerProducts = async () => {
	const products = await Products.aggregate([
	  {
		$project: {
		  name: 1,
		  images: { $slice: ["$images", -1] },
		  brand: 1,
		  price: 1,
		  articleCode: 1,
		  size: 1,
		  stock: {
			$sum: {
			  $map: {
				input: "$size",
				as: "size",
				in: { $toInt: "$$size.stock" }
			  }
			}
		  }
		}
	  },
	  {
		$lookup: {
		  from: "products",
		  let: { articleCode: "$articleCode" },
		  pipeline: [
			{
			  $match: {
				$expr: { $eq: ["$articleCode", "$$articleCode"] }
			  }
			},
			{
			  $sort: { size: -1 }
			},
			{
			  $project: {
				name: 1,
				images: { $slice: ["$images", -1] },
				size: { $slice: ["$size", -1] },
				brand: 1,
				price: 1,
				articleCode: 1
			  }
			}
		  ],
		  as: "sameCode"
		}
	  }
	]).exec();
  
	return products;
  };
  
  module.exports = getControllerProducts;