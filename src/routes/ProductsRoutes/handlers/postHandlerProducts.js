const postControllerProduct = require('../controllers/postControllerProducts');

const postHandlerProducts = async (req, res) => {
	try {
		let firebaseUrls;
		if (req.files) {
			firebaseUrls = req.files.map((file) => file.firebaseUrl);
		}
		const data = req.body;
		const product = await postControllerProduct(data, firebaseUrls);
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = postHandlerProducts;