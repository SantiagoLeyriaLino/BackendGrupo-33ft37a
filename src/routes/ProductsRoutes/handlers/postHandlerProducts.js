const postControllerProduct = require('../controllers/postControllerProducts');

const postHandlerProducts = async (req, res) => {
	try {
		const data = req.body;
		const product = await postControllerProduct(data);
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = postHandlerProducts;
